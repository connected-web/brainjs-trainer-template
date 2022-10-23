<script>
import * as brain from 'brain.js';
import axios from 'axios'
import SentenceEncoder from '../../../src/sentenceEncoder.js'

export default {
  props: {
    userAgent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      encoder: {},
      uaBrain: {},
      processedUA: '',
      encodedDataset: {},
      encodedInput: [],
      decodedInput: [],
      outputs: {},
      highProbabilityOutputs: {},
      state: 'Unmounted'
    }
  },
  async mounted() {
    this.state = 'Mounted'
    // Load the model across the network
    this.state = 'Loading trained model'
    const preTrainedModel = await axios.get('./trained-model.json')
    const { trainedNetwork, dictionary } = preTrainedModel.data
    this.state = 'Loaded trained model'
      
    // Rehydrate the model encoder with the dictionary data
    const encoder = new SentenceEncoder(dictionary)

    // Rehydrate the neural network
    this.state = 'Rehydrating network'
    const uaBrain = new brain.NeuralNetwork({})
    uaBrain.fromJSON(trainedNetwork)
    this.state = 'Rehydrated network'

    // Assign values back to vue model to display to user
    this.encoder = encoder
    this.uaBrain = uaBrain

    // Run the model with default user-agent
    this.processUserAgent()
  },
  methods: {
    processUserAgent() {
      const { encoder, uaBrain } = this

      if (!encoder.encodeSingleValue) {
        console.warn('Encoded dataset unavailable; unable to process user-agent')
        return
      }

      // Select an encode the user-agent
      const processedUA = this.userAgent
      const encodedInput = encoder.encodeSingleValue(processedUA)

      // Run the network against the encoded test input
      this.state = 'Parsing user-agent'
      const outputs = uaBrain.run(encodedInput)
      this.state = 'Parsed user-agent'

      // Select high-probabiliy values from the outputs
      const highProbabilityOutputs = Object.fromEntries(Object.entries(outputs).filter(([k,v]) => v > 0.2 ))
      const decodedInput = encoder.decodeSingleValue(encodedInput)
      console.log('Trained output:', { ua: processedUA, decodedInput, outputs, highProbabilityOutputs })

      // Assign values back to vue model to display to user
      this.processedUA = processedUA
      this.encodedInput = encodedInput
      this.decodedInput = decodedInput
      this.outputs = outputs
      this.highProbabilityOutputs = highProbabilityOutputs
    }
  },
  watch: {
    userAgent(newValue) {
      this.processUserAgent()
    }
  }
}

</script>
  
<template>
  <div>
    <p>
      <label>User-Agent:</label>
      <code>{{ userAgent || 'No user-agent set' }}</code>
    </p>
    <p>
      <label>Decoded Input:</label>
      <code>{{ decodedInput }}</code>
    </p>
    <p class="left">
      <label>High Probability Outputs:</label> 
      <pre><code>{{ JSON.stringify(highProbabilityOutputs, null, 2) }}</code></pre>
    </p>
    <p class="left">
      <label>Outputs:</label>
      <pre><code>{{ JSON.stringify(outputs, null, 2) }}</code></pre>
    </p>
    <p>
      <label>State:</label>
      <code>{{ state }}</code>
    </p>
  </div>
</template>

<style scoped>
label {
  margin-right: 0.5em;
}
p.left {
  text-align: left;
}
</style>