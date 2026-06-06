<script setup lang="ts">
defineProps<{
  label: string
  percent: number
}>()
</script>

<template>
  <div class="progress-item">
    <div class="progress-label">{{ label }}</div>
    <div class="vista-progress-track">
      <div class="vista-progress-fill" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>
