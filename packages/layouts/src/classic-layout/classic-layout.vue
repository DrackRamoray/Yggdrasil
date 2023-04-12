<template>
  <el-container class="classic-layout">
    <layout-header></layout-header>
    <el-container class="classic-layout__container">
      <layout-aside></layout-aside>
      <layout-main>
        <layout-tabs></layout-tabs>
      </layout-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import LayoutHeader from '../components/layout-header/layout-header.vue';
import LayoutAside from '../components/layout-aside/layout-aside.vue';
import LayoutMain from '../components/layout-main/layout-main.vue';
import LayoutTabs from '../components/layout-tabs/layout-tabs.vue';
</script>

<style lang="scss">
.classic-layout {
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.classic-layout__container {
  overflow: hidden;
}
</style>
