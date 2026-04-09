import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const usernameRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    })

    if (!usernameRes.ok) {
      return NextResponse.json({ error: 'Failed to resolve username' }, { status: 502 })
    }

    const usernameData = await usernameRes.json()
    if (!usernameData.data || usernameData.data.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = usernameData.data[0].id

    const [userRes, avatarRes] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${userId}`),
      fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`),
    ])

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 502 })
    }

    const userData = await userRes.json()
    let avatarUrl: string | null = null

    if (avatarRes.ok) {
      const avatarData = await avatarRes.json()
      if (avatarData.data && avatarData.data.length > 0) {
        avatarUrl = avatarData.data[0].imageUrl ?? null
      }
    }

    return NextResponse.json({
      id: userData.id,
      name: userData.name,
      displayName: userData.displayName,
      description: userData.description || '',
      created: userData.created,
      avatarUrl,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
