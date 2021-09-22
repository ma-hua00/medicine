<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <BetterScroll
    v-if="cardData.length"
    class="Bscroll "
    @scrollToEnd="searchMore"
    :pullup="true"
    :data="cardData"
    ref="Bscroll"
  >
    <div
      class="j-flex-col"
      style="padding: .1rem;
      background-color: #F5F5F5;"
    >
      <Card
        v-for="(item, index) in cardData"
        :key="index"
        :bordered="false"
        class="card mb-20"
      >
        <div class="card-title font14" slot="title">
          <span style="font-weight: 700">{{item.diseaseName + '—' + item.symptom}}</span>
          <i class="icon iconfont icon-icon" style="margin-left: 10px; color: #FD9F72; font-weight: 700"/>
          <span class="title-time font10">{{handleVisitTime(item.visitTime)}}</span>
        </div>
        <div class="card-healer mt-15">
          <h4 class="font16">{{item.doctorName}}</h4>
          <p class="font12 mt-10" style="color: #999999">{{item.hospitalName + ' ' + item.deptName}}</p>
        </div>
        <div class="card-medicine mt-15 pb-15">
          <span class="font14 medicine-content" style="color: #666"> {{handleDrugName(item.drugList)}}</span>
          <span
            class="look-more font10 mt-5"
            style="color: #FD9F72"
            @click="goToDetail(item.prescriptionId)"
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
          <span style="color:#CC5015;">{{'处方订单号: ' + item.prescriptionId}}</span>
          <span class="font10" style="float: right">{{'就诊人: ' + item.patName}}</span>
        </div>
      </Card>
      <div v-if="isFinish" class="isFinish">已经到底了</div>
    </div>
  </BetterScroll>
</template>

<script>
import {handleTime} from "../../common/js/handle";

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
      size: '10',
      // 显示是否已经到底了
      isFinish: false
    };
  },

  created(){
    this.getRecord()
  },

  mounted(){
  },

  computed: {
    // 处理处方列表的名字
    handleDrugName() {
      return function (value) {
        return value.map(item => {
          return item.drugName + item.drugNumber.slice(0, item.drugNumber.indexOf('.')) + 'g'
        }).join('、')
      }
    },
    // 处理时间
    handleVisitTime() {
      return handleTime()
    }
  },

  methods: {
    // 获取处方记录数据
    getRecord() {
      if (this.isFinish) return
      const data = {
        cardType: this.cardType,
        cardNo: this.cardNo,
        pageNo: this.pageNo,
        size: this.size
      }
       this.$post(this.$api.medicine.record, data).then(res => {
         console.log(res)
         if (res.data.list.length > 0) {
           this.cardData = res.data.list
         } else {
           this.isFinish = true
         }
      })
    },
    // 点击进入处方明细
    goToDetail(id) {
      this.$router.push({path: '/detail', query: {prescriptionId: id}} )
    },
    // 上拉加载更多
    searchMore() {
      this.pageNo++
      this.getRecord()
      setTimeout(() => {
        this.$refs.Bscroll.refresh()
      }, 20)
    },
  }
}
</script>
<style lang='scss' scoped>
  .Bscroll {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
  }

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

  .isFinish {
    text-align: center;
    font-size:.14rem;
    color:#c5c5c5;
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
