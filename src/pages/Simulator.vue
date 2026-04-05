<template>
  <div class="flex flex-col h-screen bg-background overflow-hidden">
    <Header />

    <div v-if="store.showExport" class="flex-shrink-0 border-b border-border bg-card px-4 py-3">
      <ExportPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSimulatorStore } from '@/stores/simulator'
import Header from '@/components/Header.vue'
import ExportPanel from '@/components/ExportPanel.vue'

const store = useSimulatorStore()
</script>
