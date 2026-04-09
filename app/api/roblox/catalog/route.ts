import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const assetId = request.nextUrl.searchParams.get('assetId')

  if (!assetId) {
    return NextResponse.json({ error: 'assetId is required' }, { status: 400 })
  }

  const assetIdNum = parseInt(assetId, 10)
  if (!Number.isInteger(assetIdNum) || assetIdNum <= 0 || String(assetIdNum) !== assetId) {
    return NextResponse.json({ error: 'Invalid assetId' }, { status: 400 })
  }

  try {
    const [detailsRes, thumbnailRes] = await Promise.all([
      fetch(`https://economy.roblox.com/v2/assets/${assetIdNum}/details`),
      fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${assetIdNum}&size=420x420&format=Png`),
    ])

    if (!detailsRes.ok) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    const details = await detailsRes.json()
    let thumbnailUrl: string | null = null

    if (thumbnailRes.ok) {
      const thumbnailData = await thumbnailRes.json()
      if (thumbnailData.data && thumbnailData.data.length > 0) {
        thumbnailUrl = thumbnailData.data[0].imageUrl ?? null
      }
    }

    return NextResponse.json({
      assetId: assetIdNum,
      name: details.Name ?? 'Unknown',
      price: details.PriceInRobux ?? null,
      creatorName: details.Creator?.Name ?? 'Unknown',
      thumbnailUrl,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
