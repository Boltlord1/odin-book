import type { CloudinaryImage } from '@cloudinary/url-gen/index'

interface RawImage {
	id: string
	publicId: string
  width: number
  height: number
	postId: string
}

interface ImageData {
	id: string
  width: number
  height: number
	img: CloudinaryImage
}

export type { ImageData, RawImage }
