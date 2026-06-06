<script setup lang="ts">
defineProps<{
  title: string
  author?: string
  desc?: string
  img?: string
}>()
</script>

<template>
  <div class="preview-box">
    <img v-if="img" :src="img" :alt="title" />
    <div class="preview-info">
      <strong>{{ title }}</strong>
      <span v-if="author">作者：{{ author }}</span>
      <p v-if="desc">{{ desc }}</p>
    </div>
    <div class="preview-actions">
      <div class="preview-link">阅读全文</div>
      <div class="preview-link">复制链接</div>
    </div>
  </div>
</template>
