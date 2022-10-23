import fs from 'fs'

import WordEncoder from './src/WordEncoder.js'

const rawTrainingData = JSON.parse(fs.readFileSync('./training-data/inputs-outputs.json', 'utf8'))
console.log('Loaded training data:', rawTrainingData.length, 'records')

console.time('Training encoder')
console.time('Trained encoder')
const encoder = new WordEncoder()
encoder.train(rawTrainingData.map(item => item.input))
console.timeEnd('Trained encoder')
console.log('Encoded dictionary:', encoder.dictionary)
console.log('Encoded characters:', encoder.chars)
console.log('Encoded pairs:', encoder.pairs)

const input = 'word'
console.log({
  input,
  encodedWord: encoder.encode(input)
})
