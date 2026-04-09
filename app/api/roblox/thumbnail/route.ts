import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 502 })
    }

    const data = await res.json()
    const imageUrl = data.data?.[0]?.imageUrl ?? null

    return NextResponse.json({ imageUrl })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
