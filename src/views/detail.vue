<template>
  <div class='j-full-curbox j-flex-col' style="padding: .1rem; background-color: #F5F5F5; font-family: 'PingFang SC'">
    <Card
      class="detail-method"
      :bordered="false"
    >
      <h4 class="disease-name font20" style="color: #FD9F72">{{'外感咳嗽病-风热犯肺病'}}</h4>
    </Card>
  </div>
</template>

<script>
export default {
  name: "detail"
}
</script>

<style lang="scss" scoped>
  .detail-method {
    padding: .18rem .26rem .3rem;
    line-height: 1;
    .disease-name {
      text-align: center;
    }
  }
  /deep/ .ivu-card {
    .ivu-card-head {
      border-bottom: none;
      padding: 0;
    }
    .ivu-card-body {
      padding: 0;
    }
  }
</style>
