<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface ContentItem {
  type: string
  text?: string
  items?: string[]
}

interface Article {
  id: string
  title: string
  author: string
  date: string
  headerImage: string
  content: ContentItem[]
}

const route = useRoute()
const router = useRouter()
const article = ref<Article | null>(null)
const loading = ref(true)
const notFound = ref(false)

const baseUrl = import.meta.env.BASE_URL
const articleId = computed(() => route.params.id as string)

async function loadArticle() {
  loading.value = true
  notFound.value = false
  
  try {
    const response = await fetch(`${baseUrl}data/articles.json`)
    const articles: Article[] = await response.json()
    
    const found = articles.find(a => a.id === articleId.value)
    if (found) {
      article.value = found
    } else {
      notFound.value = true
    }
  } catch (error) {
    console.error('Failed to load article:', error)
    notFound.value = true
  } finally {
    loading.value = false
  }
}

function closePage() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

function printArticle() {
  window.print()
}

onMounted(() => {
  loadArticle()
})
</script>

<template>
  <div class="article-page">
    <!-- 加载中 -->
    <div v-if="loading" class="article-loading">
      <p>加载中...</p>
    </div>

    <!-- 文章未找到 -->
    <div v-else-if="notFound" class="article-not-found">
      <h1>文章未找到</h1>
      <p>抱歉，您访问的文章不存在。</p>
      <RouterLink to="/">返回首页</RouterLink>
    </div>

    <!-- 文章内容 -->
    <template v-else-if="article">
      <!-- 顶部图片 -->
      <div class="article-header-image">
        <img :src="baseUrl + article.headerImage.replace(/^\//, '')" :alt="article.title">
        <div class="article-title-overlay">
          <h1>{{ article.title }}</h1>
        </div>
      </div>

      <!-- 渐变分割条 -->
      <div class="article-gradient-divider">
        <a class="article-button" @click="closePage">
          <img src="/articles/close.png" alt="" width="16" height="16">
          关闭页面
        </a>
        <RouterLink to="/" class="article-button">
          <img src="/articles/home.png" alt="" width="16" height="16">
          回到首页
        </RouterLink>
        <a class="article-button" @click="printArticle">
          <img src="/articles/printer.png" alt="" width="16" height="16">
          打印文章
        </a>
      </div>

      <!-- 作者信息 -->
      <div class="article-content-container">
        <div class="article-author-info">
          <p>作者：{{ article.author }}</p>
          <p>发布日期：{{ article.date }}</p>
        </div>

        <!-- 正文内容 -->
        <div class="article-content">
          <template v-for="(item, index) in article.content" :key="index">
            <h2 v-if="item.type === 'h2'">{{ item.text }}</h2>
            <h3 v-else-if="item.type === 'h3'">{{ item.text }}</h3>
            <p v-else-if="item.type === 'p'">{{ item.text }}</p>
            <pre v-else-if="item.type === 'code'"><code>{{ item.text }}</code></pre>
            <ul v-else-if="item.type === 'ul'">
              <li v-for="(li, liIndex) in item.items" :key="liIndex">{{ li }}</li>
            </ul>
            <blockquote v-else-if="item.type === 'quote'">
              {{ item.text }}
            </blockquote>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.article-loading,
.article-not-found {
  max-width: 840px;
  margin: 100px auto;
  padding: 40px 20px;
  text-align: center;
}

.article-not-found h1 {
  color: #003399;
  margin-bottom: 20px;
}

.article-not-found a {
  color: #003399;
  text-decoration: underline;
}
</style>
