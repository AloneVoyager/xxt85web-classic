<script setup lang="ts"></script>

<template>
  <div class="content wrap">
    <div class="main">
      <slot name="main"></slot>
    </div>
    <div class="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="clear"></div>
  </div>
</template>
