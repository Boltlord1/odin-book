import type { CommentData, RawComment } from '../types/comment'
import type { ImageData, RawImage } from '../types/image'
import type { PostData, RawPost } from '../types/post'
import cloudinary from './cloudinary'

function refinePost(raw: RawPost) {
	const refined: PostData = {
		id: raw.id,
		title: raw.title,
		content: raw.content,
		createdAt: new Date(raw.createdAt),
		author: {
			...raw.author,
			avatar: cloudinary.image(raw.author.avatar)
		},
		comments: raw.comments.map(refineComment),
		liked: raw.likedBy.length > 0,
		likes: raw._count.likedBy,
		images: raw.images.map(refineImage)
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

function refineImage(raw: RawImage) {
	const refined: ImageData = {
		id: raw.id,
		width: raw.width,
		height: raw.height,
		img: cloudinary.image(raw.publicId)
	}

	return refined
}

export { refineComment, refinePost }
