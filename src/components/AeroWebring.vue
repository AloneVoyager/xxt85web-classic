<script setup lang="ts">
import { ref, onMounted } from 'vue'

/**
 * Aero & Y2K Webring 小组件
 * - onMounted 动态注入外部 webring 脚本
 */

const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  const script = document.createElement('script')
  script.src = 'https://frutigeraeroarchive.org/javascript/aero-webring.min.js'
  containerRef.value.appendChild(script)
})
</script>

<template>
  <div class="aero-webring">
    <div id="aero-ring" ref="containerRef" class="aero-ring-js"></div>
  </div>
</template>
