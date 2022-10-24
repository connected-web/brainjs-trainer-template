import brain from 'brain.js'
import fs from 'fs'

import WordEncoder from './src/WordEncoder.js'

async function createContext ({ steps }) {
  const netConfig = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu',
    log: true,
    logPeriod: 100
  }
  const net = new brain.NeuralNetwork(netConfig)
  return { net, netConfig }
}

async function loadModelFromDisk () {
  const preTrainedModel = JSON.parse(fs.readFileSync('./models/trained-model.json', 'utf8'))
  const { trainedNetwork, encoderDictionary } = preTrainedModel
  return { trainedNetwork, encoderDictionary }
}

async function rehydrateNetwork ({ trainedNetwork }) {
  const net = new brain.NeuralNetwork({})
  net.fromJSON(trainedNetwork)
  return { net }
}

async function rehydrateEncoder ({ encoderDictionary }) {
  const encoder = new WordEncoder()
  encoder.rehydrate(encoderDictionary)
  return { encoder }
}

async function encodeSingleValue ({ encoder }) {
  const userInput = process.argv[2] || 'blue'
  const encodedUserInput = encoder.encode(userInput)
  return { userInput, encodedUserInput }
}

async function interpretInput ({ net, userInput, encodedUserInput }) {
  const output = net.run(encodedUserInput)
  console.log('Interpretation:', { userInput, encodedUserInput, output })
  return { output }
}

const steps = {
  '✨ Create context': createContext,
  '💽 Load model from disk': loadModelFromDisk,
  '🚰 Rehydrate network': rehydrateNetwork,
  '  Rehydrate encoder': rehydrateEncoder,
  '🗂️ Encode single value': encodeSingleValue,
  '🚅 Interpret input': interpretInput
}

async function run () {
  const context = { steps }
  const work = Object.entries(steps).map(([stepName, stepFn], index) => {
    return async () => {
      console.log('Step', (index + 1), ':', stepName)
      console.time(stepName)
      const newContext = await stepFn(context)
      console.timeEnd(stepName)
      Object.assign(context, newContext)
      console.log('')
    }
  })

  while (work.length > 0) {
    const next = work.shift()
    await next()
  }
}

run()
