import { format, quality } from '@cloudinary/url-gen/actions/delivery'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { Cloudinary, type CloudinaryImage } from '@cloudinary/url-gen/index'
import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format'
import { auto as qualityAuto } from '@cloudinary/url-gen/qualifiers/quality'

const cloudinary = new Cloudinary({ cloud: { cloudName: 'dhteb58tn' } })

type ImgFunction = (publicId: string) => CloudinaryImage

const getImg: ImgFunction = (publicId) => cloudinary.image(publicId)

const getAvatar: ImgFunction = (publicId) =>
  cloudinary.image(publicId).resize(scale().width(32).height(32))

const getMedAvatar: ImgFunction = (publicId) =>
  cloudinary.image(publicId).resize(scale().width(96).height(96))

const getBigAvatar: ImgFunction = (publicId) =>
  cloudinary.image(publicId).resize(scale().width(256).height(256))

const carouselImg = (publicId: string, width: number) =>
  cloudinary
    .image(publicId)
    .resize(scale().width(width))
    .delivery(format(formatAuto()))
    .delivery(quality(qualityAuto()))

export { carouselImg, getAvatar, getBigAvatar, getImg, getMedAvatar }
