function reverseMap<T, U>(array: T[], func: (data: T) => U) {
  const mapped: U[] = []

  for (let i = array.length; i > 0; i--) {
    mapped.push(func(array[i - 1]))
  }

  return mapped
}

export { reverseMap }
