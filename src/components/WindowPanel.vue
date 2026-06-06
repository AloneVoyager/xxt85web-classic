<script setup lang="ts">
withDefaults(defineProps<{ title?: string; showTitle?: boolean }>(), {
  title: '',
  showTitle: true,
})
</script>

<template>
  <div class="window">
    <div v-if="showTitle" class="window-titlebar">{{ title }}</div>
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>
