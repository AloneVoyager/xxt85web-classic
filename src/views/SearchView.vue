<script setup lang="ts">
import { ref } from 'vue'

import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import ContentLayout from '../components/ContentLayout.vue'
import WindowPanel from '../components/WindowPanel.vue'
import TipsPanel from '../components/TipsPanel.vue'
import FooterBar from '../components/FooterBar.vue'

interface Article {
  title: string
  url: string
}

const articles: Article[] = [
  { title: 'Vue3 Composition API 入门指南', url: '#' },
  { title: 'TypeScript 类型体操实战', url: '#' },
  { title: 'SCSS 高级用法与最佳实践', url: '#' },
  { title: 'Vite 构建优化技巧', url: '#' },
  { title: '响应式设计原理与实现', url: '#' },
  { title: '前端性能优化策略', url: '#' },
  { title: 'Vue Router 路由进阶', url: '#' },
  { title: 'Pinia 状态管理入门', url: '#' },
  { title: 'Tailwind CSS 使用指南', url: '#' },
  { title: 'JavaScript 异步编程深入', url: '#' },
  { title: 'CSS Grid 布局实战', url: '#' },
  { title: 'Flexbox 弹性布局详解', url: '#' },
  { title: 'Git 工作流最佳实践', url: '#' },
  { title: '单元测试入门教程', url: '#' },
  { title: 'E2E 测试框架对比', url: '#' },
]

const searchQuery = ref('')
const displayedArticles = ref<Article[]>([...articles])

function performSearch() {
  const query = searchQuery.value.trim()
  if (!query) {
    displayedArticles.value = [...articles]
    return
  }
  displayedArticles.value = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase())
  )
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<template>
  <TitleBar />

  <NavBar />

  <ContentLayout>
    <template #main>
      <h2><span style="color: #003399">示例搜索</span></h2>
      <p><b>样式来源：</b>搜索框、高亮效果等样式提取自 xxt85web</p>

      <WindowPanel title="搜索文件">
        <div class="search-container">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="输入关键词搜索示例文章..."
              @keyup.enter="performSearch"
            />
            <button type="button" @click="performSearch">搜索</button>
          </div>
        </div>

        <TipsPanel style="margin-top: 12px">
          <p><b>说明</b></p>
          <p>本页面为示例搜索功能演示，展示搜索框样式和高亮匹配效果。</p>
          <p>尝试搜索 "Vue"、"TypeScript"、"CSS" 等关键词查看效果。</p>
        </TipsPanel>

        <div class="search-results">
          <h3 v-if="!searchQuery">所有示例文章</h3>
          <h3 v-else>搜索结果 ({{ displayedArticles.length }} 条)</h3>
          <ul class="article-list">
            <li v-for="(article, idx) in displayedArticles" :key="idx">
              <a :href="article.url" v-html="highlightMatch(article.title, searchQuery)" />
            </li>
          </ul>
          <div v-if="displayedArticles.length === 0" class="no-results">
            没有找到匹配的内容
          </div>
        </div>
      </WindowPanel>
    </template>

    <template #sidebar>
      <WindowPanel title="搜索提示">
        <p>在此页面您可以搜索站内所有示例文章。</p>
        <p>输入关键词后点击搜索按钮，匹配的标题会高亮显示。</p>
      </WindowPanel>

      <WindowPanel title="热门搜索">
        <ul>
          <li><a href="#" @click.prevent="searchQuery = 'Vue'; performSearch()">Vue3</a></li>
          <li><a href="#" @click.prevent="searchQuery = 'TypeScript'; performSearch()">TypeScript</a></li>
          <li><a href="#" @click.prevent="searchQuery = 'CSS'; performSearch()">CSS</a></li>
          <li><a href="#" @click.prevent="searchQuery = '性能'; performSearch()">性能优化</a></li>
        </ul>
      </WindowPanel>
    </template>
  </ContentLayout>

  <FooterBar>
    <p>版权没有 示例站点 不保留任何权利</p>
    <p>Best view at 1024x768</p>
  </FooterBar>
</template>
