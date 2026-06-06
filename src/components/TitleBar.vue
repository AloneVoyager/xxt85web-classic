<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), {
  title: 'xxtsoft.top',
})
</script>

<template>
  <div class="titlebar">
    <div class="wrap">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
