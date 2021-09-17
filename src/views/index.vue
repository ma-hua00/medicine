<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class='j-full-curbox j-flex-col'>

    <div class='header'></div>

    <div class='container' @click="$refs.da.show =true">你好</div>

    <div class='footer'></div>

  </div>

</template>

<script>
export default {
  data () {
    return {};
  },

  created(){},


  mounted(){
  },

  methods: {
  }
}
</script>
<style lang='scss' scoped>
  .header{}

  .container{}

  .footer{}

</style>