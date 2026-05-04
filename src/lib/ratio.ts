import type { ImageData } from '../types/data'

function highestRatio(data: ImageData[]) {
  let max = 0

  for (const image of data) {
    const ratio = image.height / image.width

    if (ratio >= 1) {
      return 1
    }

    if (ratio > max) {
      max = ratio
    }
  }

  return max
}

export default highestRatio
