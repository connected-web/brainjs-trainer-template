<template>
  <div>
    <p>
      <label>User Input:</label>
      <code>{{ userInput || 'No user-input set' }}</code>
    </p>
    <div class="left">
      <label>Outputs:</label>
      <div class="color-bar" :style="color.style">R: {{ color.red }}, G: {{ color.green }}, B: {{ color.blue }}</div>
      <pre><code>{{ JSON.stringify(outputs, null, 2) }}</code></pre>
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
      outputs: {},
      state: "Unmounted",
    };
  },
  computed: {
    color () {
      const { r, g, b } = this.outputs
      const red = Math.round(r * 255)
      const green = Math.round(b * 255)
      const blue = Math.round(g * 255)
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
    const { trainedNetwork, dictionary } = preTrainedModel.data;
    this.state = "Loaded trained model";

    // Rehydrate the neural network
    this.state = "Rehydrating network";
    const trainedBrain = new brain.NeuralNetwork({});
    trainedBrain.fromJSON(trainedNetwork);
    this.state = "Rehydrated network";

    // Assign values back to vue model to display to user
    this.trainedBrain = trainedBrain;

    // Run the model with default user-agent
    this.runNeuralNework();
  },
  methods: {
    runNeuralNework() {
      const { trainedBrain } = this;

      // Select an encode the user input
      const userInput = this.userInput;

      // Run the network against the encoded test input
      this.state = "Parsing user-agent";
      const outputs = trainedBrain.run(userInput);
      this.state = "Parsed user-agent";

      // Select high-probabiliy values from the outputs
      console.log("Trained output:", { userInput, outputs });

      // Assign values back to vue model to display to user
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
  padding: 0.5em;
}
</style>