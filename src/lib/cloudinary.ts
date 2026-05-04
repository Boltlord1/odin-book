import { Cloudinary } from '@cloudinary/url-gen/index'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dhteb58tn'
  }
})

const getImg = (publicId: string) => {
  const image = cloudinary.image(publicId)
  return image
}

export default getImg
