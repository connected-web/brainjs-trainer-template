<script>
import Quickstart from './components/Quickstart.vue'
import NeuralNetwork from './components/NeuralNetwork.vue'

import BrainJSTrainerTile from './components/BrainJSTrainerTile.vue'
import BrainJSTile from './components/BrainJSTile.vue'

export default {
  components: { Quickstart, NeuralNetwork, BrainJSTrainerTile, BrainJSTile },
  data() {
    return {
      userInput: ''
    }
  }
}

</script>

<template>
  <div>
    <div class="title-icons">
      <BrainJSTile />
      <BrainJSTrainerTile />
    </div>
    <Quickstart title="BrainJS Trainer Template" />
    <p><input v-model="userInput" class="userAgentInput" placeholder="Enter colour" /></p>
    <NeuralNetwork :user-input="userInput" />
  </div>
</template>

<style scoped>
.userAgentInput {
  width: 80vw;
  padding: 1em;
  text-align: center;
  font-size: 0.8em;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
</style>
