<template>
    <div>
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">停车王</el-menu-item>
            <el-submenu index="2">
                <template slot="title">线下运维</template>
                <el-menu-item index="2-1"><a href="/parkinfo">车场管理</a></el-menu-item>
                <el-menu-item index="2-2">设备管理</el-menu-item>
                <el-menu-item index="2-3">自助机管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="10" class="pull-right"><a href="/logout">退出</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style proped>
    .pull-right{float:right;}
</style>