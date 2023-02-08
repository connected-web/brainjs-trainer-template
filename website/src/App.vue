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
    <div class="row"><input v-model="userInput" class="userAgentInput" placeholder="Enter colour" /></div>
    <NeuralNetwork :user-input="userInput" />
  </div>
</template>

<style scoped>
.userAgentInput {
  display: block;
  padding: 1em 0;
  width: 100%;
  text-align: center;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 0.8em;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
div.row {
  display: flex;
  justify-content: stretch;
  margin-bottom: 1em;
}
</style>
