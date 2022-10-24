import brain from 'brain.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import WordEncoder from './src/WordEncoder.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

async function loadTrainingData () {
  const inputsAndOutputsPath = path.join(__dirname, './training-data/inputs-outputs.json')
  const rawTrainingData = JSON.parse(fs.readFileSync(inputsAndOutputsPath, 'utf8'))
  console.log('Loaded training data:', rawTrainingData.length, 'records')
  return { rawTrainingData }
}

async function trainEncoder ({ rawTrainingData }) {
  const encoder = new WordEncoder()
  encoder.train(rawTrainingData.map(item => item.input))
  console.log('Encoded dictionary:', encoder.dictionary)
  console.log('Encoded characters:', encoder.chars)
  console.log('Encoded pairs:', encoder.pairs)
  return { encoder }
}

async function encodeTrainingData ({ rawTrainingData, encoder }) {
  const encodedTrainingData = rawTrainingData.map(item => {
    const encodedInput = encoder.encode(item.input)
    return {
      input: encodedInput,
      output: item.output
    }
  })
  return { encodedTrainingData }
}

async function trainNetwork ({ net, encodedTrainingData }) {
  const trainingResults = net.train(encodedTrainingData)
  console.log('Training results:', trainingResults)
  return { trainingResults }
}

async function saveTrainedModel ({ net, encoder }) {
  const trainedNetwork = net.toJSON()
  const encoderDictionary = encoder.dictionary
  const modelPath = path.join(__dirname, './models/trained-model.json')
  fs.writeFileSync(modelPath, JSON.stringify({ trainedNetwork, encoderDictionary }, null, 2))
}

async function testTrainedModel ({ net, encoder }) {
  function interpret (input) {
    const encodedInput = encoder.encode(input)
    const output = net.run(encodedInput)
    console.log('Trained output:', { input, encodedInput, output })
  }

  interpret('red')
  interpret('green')
  interpret('yellow')
  interpret('blue')
  interpret('orange')
  interpret('cyan')
  interpret('white')
  interpret('black')
  interpret('ack')
}

const steps = {
  '✨ Create context': createContext,
  '💽 Load training data': loadTrainingData,
  '🚅 Train encoder': trainEncoder,
  '🗂️ Encode training data': encodeTrainingData,
  '🚅 Train network': trainNetwork,
  '💽 Save trained model': saveTrainedModel,
  '🏃 Test trained model': testTrainedModel
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
