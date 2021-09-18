<template>
  <div
    class="lines"
    :style="{padding: `0 ${paddingSize}px `}"
  >
    <div
      class="left"
      :style="{width: size + 'px', height: size + 'px', backgroundColor: color, borderTopRightRadius: size * 0.5 + 'px', borderBottomRightRadius: size * 0.5 + 'px'}"
    ></div>
    <div class="center"></div>
    <div
      class="right"
      :style="{width: size + 'px', height: size + 'px', backgroundColor: color, borderTopLeftRadius: size * 0.5 + 'px', borderBottomLeftRadius: size * 0.5 + 'px'}"
    ></div>
  </div>
</template>

<script>
export default {
  name: "lines",
  props: {
    // 左右两侧小圆柱的大小
    size: {
      type: Number,
      default: 12
    },
    // 颜色
    color: {
      type: String,
      default: '#FD9F72'
    },
    // 内边距大小
    paddingSize: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style lang="scss" scoped>
  .lines {
    display: flex;
    align-items: center;
    .center {
      width: 100%;
      height: 1px;
      background-color: #FD9F72;
    }
    .left {
    }
  }
</style>