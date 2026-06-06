<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <TitleBar />

  <NavBar />

  <div class="content wrap" style="text-align: center; padding-top: 40px;">
    <p><span style="color: #003399;"><font size="48"><b>404 Not Found</b></font></span></p>
    <div style="text-align: center; margin-top: 20px;">
      <img alt="下江小春举牌子" src="/images/404.gif" />
    </div>
    <p style="margin-top: 20px;"><font size="5">你要找的网页不见啦！</font></p>
    <p style="margin-top: 20px;">
      <RouterLink to="/">返回首页</RouterLink>
    </p>
  </div>
</template>
