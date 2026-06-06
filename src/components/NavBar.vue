<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavItem {
  label: string
  href: string
}

withDefaults(defineProps<{ items?: NavItem[] }>(), {
  items: () => [
    { label: '首页(H)', href: '/' },
    { label: '文章(A)', href: '/articles' },
    { label: '下载(D)', href: '/downloads' },
    { label: '多媒体(M)', href: '/medias' },
    { label: '关于(A)', href: '/about' },
  ],
})
</script>

<template>
  <div class="navbar">
    <div class="wrap">
      <ul>
        <li v-for="(item, idx) in items" :key="idx">
          <RouterLink :to="item.href">{{ item.label }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
