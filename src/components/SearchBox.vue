<script setup lang="ts">
withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: '搜索...',
})
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <input type="text" :placeholder="placeholder" />
      <button type="button">搜索</button>
    </div>
    <div class="search-results"></div>
  </div>
</template>
