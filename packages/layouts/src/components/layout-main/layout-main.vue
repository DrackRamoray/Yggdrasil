<template>
  <el-main class="layout-main">
    <slot></slot>
    <router-view v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.layout-main {
  position: relative;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
