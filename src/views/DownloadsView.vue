<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import ContentLayout from '../components/ContentLayout.vue'
import WindowPanel from '../components/WindowPanel.vue'
import FooterBar from '../components/FooterBar.vue'
</script>

<template>
  <TitleBar />

  <NavBar />

  <ContentLayout>
    <template #main>
      <h2><span style="color: #003399">示例下载页面</span></h2>
      <p><b>样式来源：</b>本页面复用了 xxt85web 的窗口组件、列表样式等基础样式</p>
      <p>以下是一些示例下载资源，用于展示样式效果</p>
      <p><RouterLink to="/">返回首页</RouterLink></p>

      <WindowPanel title="示例资源列表">
        <h3>前端工具（2024）</h3>
        <ul>
          <li>
            <a href="#">Vue Devtools Pro</a>
            <p>Vue.js 开发者工具增强版，支持组件树可视化、性能分析</p>
          </li>
          <li>
            <a href="#">TypeScript Playground</a>
            <p>在线 TypeScript 编写工具，支持实时编译和类型检查</p>
          </li>
          <li>
            <a href="#">Vite CLI</a>
            <p>新一代前端构建工具命令行工具，快速初始化项目</p>
          </li>
        </ul>

        <h3>设计资源（2024）</h3>
        <ul>
          <li>
            <a href="#">Aero UI Kit</a>
            <p>Vista/Aero 风格 UI 组件包，包含按钮、图标、表单等元素</p>
          </li>
          <li>
            <a href="#">SCSS Variables</a>
            <p>常用 SCSS 变量集，包含颜色、字体、间距等定义</p>
          </li>
          <li>
            <a href="#">Icon Pack</a>
            <p>开源图标集，包含常用工具类图标 200+</p>
          </li>
        </ul>

        <h3>模板项目（2023）</h3>
        <ul>
          <li>
            <a href="#">Vue3 Admin Template</a>
            <p>基于 Vue3 + Element Plus 的后台管理系统模板</p>
          </li>
          <li>
            <a href="#">Landing Page Starter</a>
            <p>响应式落地页起始模板，支持暗色模式切换</p>
          </li>
          <li>
            <a href="#">Component Library</a>
            <p>常用前端组件库，包含 50+ 可复用组件</p>
          </li>
        </ul>

        <h3>开发文档（2023）</h3>
        <ul>
          <li><a href="#">Vue3 入门指南.pdf</a></li>
          <li><a href="#">TypeScript 速查表.pdf</a></li>
          <li><a href="#">SCSS 最佳实践.pdf</a></li>
          <li><a href="#">前端性能优化清单.pdf</a></li>
        </ul>

        <h3>旧版本存档（2022）</h3>
        <ul>
          <li><a href="#">Vue2 Admin (Legacy)</a></li>
          <li><a href="#">Webpack Config Templates</a></li>
          <li><a href="#">jQuery Plugin Collection</a></li>
        </ul>
      </WindowPanel>
    </template>

    <template #sidebar>
      <WindowPanel title="资源分类">
        <ul>
          <li><a href="#">前端工具</a></li>
          <li><a href="#">设计资源</a></li>
          <li><a href="#">模板项目</a></li>
          <li><a href="#">开发文档</a></li>
          <li><a href="#">旧版本存档</a></li>
        </ul>
      </WindowPanel>

      <WindowPanel title="下载说明">
        <ul>
          <li>所有资源均免费提供</li>
          <li>无需登录即可下载</li>
          <li>持续更新中</li>
        </ul>
      </WindowPanel>
    </template>
  </ContentLayout>

  <FooterBar>
    <p>版权没有 示例站点 不保留任何权利</p>
    <p>Best view at 1024x768</p>
  </FooterBar>
</template>
