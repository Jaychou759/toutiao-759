<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from '@/utils/request'
export default {
  created(){
    console.dir(axios)
  }
}
</script>

<style scoped lang="less">

</style>
