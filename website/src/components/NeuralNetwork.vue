<template>
  <div>
    <div class="left">
      <div class="color-bar" :style="color.style">
        <label class="light">R: {{ color.red }}, G: {{ color.green }}, B: {{ color.blue }}</label>
        <label class="dark">R: {{ color.red }}, G: {{ color.green }}, B: {{ color.blue }}</label>
      </div>
      <h3>Outputs:</h3>
      <pre><code>{{ JSON.stringify(outputs, null, 2) }}</code></pre>
      <h3>Encoded User Input:</h3>
      <pre><code>{{ JSON.stringify(encodedUserInput, null, 2) }}</code></pre>
    </div>
    <p>
      <label>State:</label>
      <code>{{ state }}</code>
    </p>
  </div>
</template>

<script>
import * as brain from "brain.js";
import axios from "axios";

import WordEncoder from '../../../trainer/src/WordEncoder.js'

export default {
  props: {
    userInput: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      trainedNetwork: {},
      encodedUserInput: {},
      outputs: {},
      state: "Unmounted",
    };
  },
  computed: {
    color () {
      const { r, g, b } = this.outputs
      const red = Math.round(r * 255)
      const green = Math.round(g * 255)
      const blue = Math.round(b * 255)
      return {
        red,
        green,
        blue,
        style: `background: rgb(${red}, ${green}, ${blue});`
      }
    }
  },
  async mounted() {
    this.state = "Mounted";
    // Load the model across the network
    this.state = "Loading trained model";
    const preTrainedModel = await axios.get("./trained-model.json");
    const { trainedNetwork, encoderDictionary } = preTrainedModel.data;
    this.state = "Loaded trained model";

    // Rehydrate the neural network
    this.state = "Rehydrating network";
    const trainedBrain = new brain.NeuralNetwork({});
    trainedBrain.fromJSON(trainedNetwork);
    this.state = "Rehydrated network";

    // Rehydrate the encoder
    this.state = "Rehydrating encoder"
    const encoder = new WordEncoder();
    encoder.rehydrate(encoderDictionary);

    // Assign values back to vue model to display to user
    this.trainedBrain = trainedBrain;
    this.encoder = encoder;

    // Run the model with default user input
    this.runNeuralNework();
  },
  methods: {
    runNeuralNework() {
      const { trainedBrain, encoder } = this;

      // Select an encode the user input
      const userInput = this.userInput;

      // Run the network against the encoded test input
      this.state = "Parsing user-input";
      const encodedUserInput = encoder.encode(userInput)
      const outputs = trainedBrain.run(encodedUserInput);
      this.state = "Parsed user-input";

      // Select high-probabiliy values from the outputs
      console.log("Trained output:", { userInput, outputs });

      // Assign values back to vue model to display to user
      this.encodedUserInput = encodedUserInput;
      this.outputs = outputs;
    },
  },
  watch: {
    userInput(newValue) {
      this.runNeuralNework();
    },
  },
};
</script>

<style scoped>
label {
  margin-right: 0.5em;
}
.left {
  text-align: left;
}
.color-bar {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 4px;
  font-weight: bold;
}
label.light {
  color: black;
}
label.dark {
  color: white;
}
</style>