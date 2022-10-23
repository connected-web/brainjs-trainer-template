import brain from 'brain.js'
import fs from 'fs'

console.time('Parse script')

console.time('Load model from disk')
const preTrainedModel = JSON.parse(fs.readFileSync('./models/trained-model.json', 'utf8'))
const { trainedNetwork } = preTrainedModel
console.timeEnd('Load model from disk')

// create a simple feed forward neural network with backpropagation
console.time('Rehydrate network')
const net = new brain.NeuralNetwork({})
net.fromJSON(trainedNetwork)
console.timeEnd('Rehydrate network')

console.time('Encode single value')
const userInput = process.argv[2] || 'blue'
console.timeEnd('Encode single value')

console.time('Parse UA through net')
const output = net.run(userInput)
console.timeEnd('Parse UA through net')

console.log('Trained output:', { userInput, output })

console.timeEnd('Parse script')
