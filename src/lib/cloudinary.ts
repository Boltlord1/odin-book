import { format, quality } from '@cloudinary/url-gen/actions/delivery'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format'
import { auto as qualityAuto } from '@cloudinary/url-gen/qualifiers/quality'

const cloudinary = new Cloudinary({ cloud: { cloudName: 'dhteb58tn' } })

const getImg = (publicId: string) => cloudinary.image(publicId)

const carouselImg = (publicId: string, width: number) =>
  cloudinary
    .image(publicId)
    .resize(scale().width(width))
    .delivery(format(formatAuto()))
    .delivery(quality(qualityAuto()))

export { carouselImg, getImg }
