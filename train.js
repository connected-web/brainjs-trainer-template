import brain from 'brain.js'
import fs from 'fs'

import WordEncoder from './src/WordEncoder.js'

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu',
  log: true,
  logPeriod: 100
}

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config)

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

console.log('🚅 Training network')
console.time('🚅 Trained network')
const trainingResults = net.train(rawTrainingData)
console.timeEnd('🚅 Trained network')
console.log('Training results:', trainingResults)

console.log('💽 Saving trained model')
console.time('💽 Saved trained model')
const trainedNetwork = net.toJSON()
const modelPath = './models/trained-model.json'
fs.writeFileSync(modelPath, JSON.stringify({ trainedNetwork }, null, 2))
console.timeEnd('💽 Saved trained model')
console.log('Saved trained model:', modelPath)

console.log('🏃 Testing model with sample input')
console.time('🏃 Tested model with sample input')
const testInput = 'red'
const output = net.run(testInput)
console.timeEnd('🏃 Tested model with sample input')
console.log('Trained output:', { testInput, output })
