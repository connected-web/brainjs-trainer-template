function findChars (dictionary) {
  const charSet = dictionary.reduce((acc, word) => {
    const chars = word.split('')
    chars.forEach(c => acc.add(c))
    return acc
  }, new Set())
  return Array.from(charSet)
}

function findPairs (dictionary) {
  const pairSet = dictionary.reduce((acc, word) => {
    const pairs = word.split('').reduce((acc, c, index, source) => {
      const pair = c + (source[index + 1] || ' ')
      acc.push(pair)
      return acc
    }, [])
    pairs.forEach(p => acc.add(p))
    return acc
  }, new Set())
  return Array.from(pairSet)
}

export default class WordEncoder {
  constructor () {
    this.dictionary = []
    this.chars = []
    this.pairs = []
  }

  train (words) {
    const wordSet = words.reduce((acc, sentence) => {
      const words = sentence.split(/\s/)
      words.forEach(w => acc.add(w))
      return acc
    }, new Set())
    this.dictionary = Array.from(wordSet)
    this.chars = findChars(this.dictionary)
    this.pairs = findPairs(this.dictionary)
  }

  rehydrate (dictionary) {
    this.dictionary = dictionary
  }

  encode (word) {
    const encodedInputs = {}

    const wordChars = findChars([word])
    const existingChars = new Set(this.chars)
    wordChars.forEach(key => {
      if (existingChars.has(key)) {
        encodedInputs[key] = 0.5
      }
    })

    const wordPairs = findPairs([word])
    const existingPairs = new Set(this.pairs)
    wordPairs.forEach(key => {
      if (existingPairs.has(key)) {
        encodedInputs[key] = 1.0
      }
    })

    return encodedInputs
  }

  decode () {

  }
}
