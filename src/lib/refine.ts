import type { CommentData, PostData, RawComment, RawPost } from './types'
import cloudinary from './cloudinary'

function refinePost(raw: RawPost) {
  const refined: PostData = {
    ...raw,
    createdAt: new Date(raw.createdAt),
    author: {
      ...raw.author,
      avatar: cloudinary.image(raw.author.avatar)
    },
    comments: raw.comments.map(refineComment)
  }

  return refined
}

function refineComment(raw: RawComment) {
  const refined: CommentData = {
    ...raw,
    createdAt: new Date(raw.createdAt),
    author: {
      ...raw.author,
      avatar: cloudinary.image(raw.author.avatar)
    }
  }

  return refined
}

export { refineComment, refinePost }
