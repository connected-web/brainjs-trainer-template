<script>
import Quickstart from './components/Quickstart.vue'
import UABrain from './components/UABrain.vue'

import UABrainTile from './components/UABrainTile.vue'
import BrainJSTile from './components/BrainJSTile.vue'

export default {
  components: { Quickstart, UABrain, UABrainTile, BrainJSTile },
  data() {
    return {
      userAgent: navigator.userAgent
    }
  }
}

</script>

<template>
  <div>
    <div class="title-icons">
      <BrainJSTile />
      <UABrainTile />
    </div>
    <Quickstart title="User-Agent Brain" />
    <input v-model="userAgent" class="userAgentInput" />
    <UABrain :user-agent="userAgent" />
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
