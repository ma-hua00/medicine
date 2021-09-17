<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div
    class='j-full-curbox j-flex-col'
    style="padding: .1rem;
    background-color: #F5F5F5;
    font-family: 'PingFang SC'"
  >
<!--    <Card :key="item.id" v-for="(item, index) in cardData" :bordered="false">-->
<!--      <div class="card-title" slot="title">-->
<!--        <span>{{item.diseaseName || '开干咳嗽病-风热犯肺症'}}</span>-->
<!--        <i class="icon iconfont icon-icon"/>-->
<!--        <span class="title-time">{{item.visitTime || '2021年09月14号'}}</span>-->
<!--      </div>-->
<!--    </Card>-->

    <Card :bordered="false" class="card">
      <div class="card-title font14" slot="title">
        <span style="font-weight: 700">{{'开干咳嗽病-风热犯肺症'}}</span>
        <i class="icon iconfont icon-icon" style="margin-left: 10px; color: #FD9F72; font-weight: 700"/>
        <span class="title-time font10">{{'2021年09月14号'}}</span>
      </div>
      <div class="card-healer mt-15">
        <h4 class="font16">张医生</h4>
        <p class="font12 mt-10" style="color: #999999">浙江省杭州市中医院 中医科</p>
      </div>
      <div class="card-medicine mt-15 pb-15">
        <span class="font14 medicine-content" style="color: #666">黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、黄只10g、</span>
        <span
            class="look-more font10 mt-5"
            style="color: #FD9F72"
            @click="goToDetail"
        >查看详情>></span>
      </div>
      <div class="card-distribution font12">
        <span>{{'配送中'}}</span>
        <div class="distribution-icon ml-10">
          <i class="icon iconfont icon-songhuo" style="color: #fff;"/>
        </div>
        <div v-for="item in [1,2,3]" class="circle"></div>
      </div>
      <div class="card-footer font16">
        <span style="color:#CC5015;">{{'处方订单号: 0000000001'}}</span>
        <span class="font10" style="float: right">{{'就诊人: ' + '小红'}}</span>
      </div>
    </Card>

  </div>

</template>

<script>
export default {
  data () {
    return {
      // 卡片数据
      cardData: [],
      // 证件类型
      cardType: 1,
      // 卡号
      cardNo: '330523200011056347',
      // 当前页码
      pageNo: '1',
      // 每条页数
      size: '10'
    };
  },

  created(){
    // this.getRecord()
  },


  mounted(){
  },

  methods: {
    // 获取处方记录数据
    getRecord() {
      const data = {
        cardType: this.cardType,
        cardNo: this.cardNo,
        pageNo: this.pageNo,
        size: this.size
      }
      this.$post(this.$api.medicine.record, data).then(res => {
            console.log(res)
      })
    },
    // 点击进入处方明细
    goToDetail() {
      this.$router.push('/detail')
    }
  }
}
</script>
<style lang='scss' scoped>

  .card {
    color: #333333;
    padding: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .15);
    .card-title {
      line-height: .14rem;
      .title-time {
        float: right;
      }
    }
    .card-medicine {
      overflow: hidden;
      border-bottom: .01rem solid #EEEEEE;
      .medicine-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-break: break-all;
      }
      .look-more {
        float: right;
      }
    }
    .card-distribution {
      padding: 0 10px;
      margin: 14px 0;
      line-height: .25rem;
      background-color: #F5F5F5;
      .distribution-icon {
        display: inline-block;
        height: .25rem;
        width: .25rem;
        text-align: center;
        border-radius: 50%;
        background-color: #FD9F72;
      }
      .circle {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #FD9F72;
      }
    }
    .card-footer {
      line-height: .16rem;
      font-weight: 700;
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
