export interface RobloxUser {
  id: number
  name: string
  displayName: string
  description: string
  created: string
  avatarUrl: string | null
}

export interface RobloxAsset {
  assetId: number
  name: string
  price: number | null
  creatorName: string
  thumbnailUrl: string | null
}

export async function resolveUsername(username: string): Promise<number | null> {
  const res = await fetch('https://users.roblox.com/v1/usernames/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.data?.[0]?.id ?? null
}

export async function fetchUserInfo(userId: number): Promise<RobloxUser | null> {
  const res = await fetch(`https://users.roblox.com/v1/users/${userId}`)
  if (!res.ok) return null
  const data = await res.json()
  return {
    id: data.id,
    name: data.name,
    displayName: data.displayName,
    description: data.description || '',
    created: data.created,
    avatarUrl: null,
  }
}

export async function fetchAvatarUrl(userId: number): Promise<string | null> {
  const res = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.data?.[0]?.imageUrl ?? null
}
