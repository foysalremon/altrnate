<template>
  <div class="flex flex-col h-screen bg-background overflow-hidden">
    <Header />

    <div class="flex flex-1 min-h-0 overflow-hidden">
      <Editor />
      <Simulation />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSimulatorStore } from '@/stores/simulator'
import Header from '@/components/Header.vue'
import Editor from '@/components/Editor.vue'
import Simulation from '@/components/Simulation.vue'

const store = useSimulatorStore()
</script>
