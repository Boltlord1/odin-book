type UpdatePost = (id: string) => Promise<void>
type LikePost = (id: string, dislike: boolean) => void

export type { LikePost, UpdatePost }
