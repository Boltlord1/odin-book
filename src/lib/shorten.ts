const newLine = /\r?\n/

function shorten(content: string | null, length: number) {
  if (content === null || content.length <= length) {
    return content
  }

  let string = content

  if (newLine.test(string)) {
    string = content.split(newLine)[0]
  }

  if (string.length > length) {
    const shortened = string.slice(0, length)
    const lastSpace = shortened.lastIndexOf(' ')

    if (lastSpace === -1) {
      string = shortened
    } else {
      string = string.slice(0, lastSpace)
    }
  }

  return `${string}...`
}

export default shorten
