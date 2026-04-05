<template>
  <aside
    :class="[
      'flex-shrink-0 border-r border-border bg-card overflow-y-auto transition-all duration-300 truncate',
      sidebarCollapsed ? 'w-10' : 'w-80',
    ]"
  >
    <button
      class="cursor-pointer w-full h-full flex items-start justify-center pt-4 text-muted-foreground hover:text-foreground"
      v-if="sidebarCollapsed"
      data-testid="btn-expand-sidebar"
      @click="sidebarCollapsed = false"
    >
      <ChevronRight class="w-4 h-4" />
    </button>
    <div v-else class="p-4 flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Content Editor
        </span>
        <button
          class="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          data-testid="btn-collapse-sidebar"
          @click="sidebarCollapsed = true"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
      </div>

      <VariantEditor variant="A" :config="store.variantA" />

      <div className="border-t border-border" />

      <VariantEditor variant="B" :config="store.variantB" />
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, ChevronLeft } from '@lucide/vue'
import { useSimulatorStore } from '@/stores/simulator'
import VariantEditor from '@/components/VariantEditor.vue'

const sidebarCollapsed = ref(false)

const store = useSimulatorStore()
</script>
