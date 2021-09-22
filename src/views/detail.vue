<template>
  <div v-if="detailData"
       class='j-full-curbox j-flex-col detail' style="padding: .1rem; background-color: #F5F5F5; font-family: 'PingFang SC'"
  >
    <Card
      class="detail-method mb-10"
      :bordered="false"
    >
      <h4 class="disease-name font18" style="color: #FD9F72">{{detailData.diseaseName + '—' + detailData.symptom}}</h4>
      <lines class="mt-5"/>
      <ul  class="prescription mt-10">
        <li
          v-for="(item, index) in isShowDrug ? detailData.drugList : drugLength > 12 ? detailData.drugList.slice(0, 11) : detailData.drugList.slice(0, 12)"
          :key="index"
          class="font16 mt-20">
          {{item.drugName + ': ' + item.drugNumber}}
        </li>
        <li
          v-if="drugLength > 12"
          class="font14 mt-20 more-and-close"
          @click="handleShowDrug"
        >
          {{isShowDrug ? '&lt&lt收起' : '展开>>'}}
        </li>
      </ul>
      <lines class="mt-30"/>
      <div
        class="use-method font14"
      >
        <div style="color: #1DBC83">
          <span>用法</span>
          <i class="icon iconfont icon-yaoping"></i>
        </div>
        <div>{{'贴数: ' + detailData.number}}</div>
        <div>{{detailData.instruction.slice(0, detailData.instruction.indexOf(')') + 1)}}</div>
        <div>{{detailData.instruction.slice(detailData.instruction.indexOf(')') + 1)}}</div>
      </div>
      <div class="total-money mt-15 font14">
        <span>{{'总金额: ' + detailData.totalAmount + '元'}}</span>
      </div>
    </Card>
    <Card
      class="detail-message font15"
      :bordered="false"
    >
      <div
        class="message-title"
        slot="title"
      >
        <div class="healer-message">
          <i class="icon iconfont icon-yisheng font20 doctor-icon"></i>
          <span class="doctor-name">{{'医生姓名: ' + detailData.doctorName}}</span>
          <span class="hospital-name">{{detailData.deptName}}</span>
          <span class="visit-time font12">{{handleVisitTime(detailData.visitTime)}}</span>
        </div>
        <div class="patient-message mt-15 mb-25">{{'就诊人: ' + detailData.patName}}</div>
      </div>
      <div class="drug-state">
        <div class="content">
          <i class="icon iconfont icon-yaoping font20" style="color: #F79465;"></i>
          <span style="font-weight: bold">处方状态</span>
        </div>
        <div class="state pt-15 pb-10 mt-10" style="background-color: #F5F5F5;">
          <Divider style="color: #F79465; margin: 0">
            <span class="font12">{{'煎煮中'}}</span>
            <i class="icon iconfont icon-guo font20 ml-5"></i>
          </Divider>
        </div>
      </div>
      <div class="distributio-state mt-30">
        <div class="content">
          <i class="icon iconfont icon-songhuo font20" style="color: #F79465;"></i>
          <span style="font-weight: bold">配送状态</span>
          <div class="order-number font12">
            <span class="mr-15">{{'订单号: 00000000001'}}</span>
            <span style="color: #CC5015;">复制</span>
          </div>
        </div>
<!--        <div class="state">-->
<!--          <Steps direction="vertical">-->
<!--            <step v-for="(item, index) in stepData">-->

<!--            </step>-->
<!--          </Steps>-->
<!--        </div>-->
      </div>
    </Card>
  </div>
</template>

<script>
import {handleTime} from "../../common/js/handle";

export default {
  name: "detail",
  data() {
    return {
      // 处方详情数据
      detailData: null,
      // 是否展示所有处方药材
      isShowDrug: false,
      // 处方的数量
      drugLength: 0,
      // 配送状态步骤数据
      stepData: []
    }
  },
  created() {
    let query = this.$route.query.prescriptionId
    this.getDetailed(query)
    // this.getStatusInfoList(query)
  },
  computed: {
    handleVisitTime() {
      return handleTime()
    }
  },
  methods: {
    // 获取处方详细数据
    getDetailed(prescriptionId) {
      this.$post(this.$api.medicine.detailed, {prescriptionId}).then(res => {
        this.detailData = res.data
        this.detailData.drugList.forEach(item => {
          item.drugNumber = item.drugNumber.slice(0, item.drugNumber.indexOf('.')) + 'g'
        })
        this.drugLength = res.data.drugList.length
      })
    },
    // 查询处方配送状态信息
    getStatusInfoList(prescriptionId) {
      this.$post(this.$api.medicine.distribution, {prescriptionId}).then(res => {
        console.log(res)
      })
    },
    // 展开或者收起处方药材
    handleShowDrug() {
      this.isShowDrug = !this.isShowDrug
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    line-height: 1;
    color: #333333;
    .detail-method {
      padding: .18rem .28rem .3rem;
      .disease-name {
        text-align: center;
      }
      .prescription {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          display: inline-block;
          width: 30%;
          font-weight: 600;
        }
        .more-and-close {
          line-height: .16rem;
          text-align: center;
          color: #1DBC83;
        }
      }
      .use-method {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .14rem -.18rem;
        padding: .14rem .34rem .16rem .17rem;
        background-color: #F5F5F5;
        font-weight: 500;
      }
      .total-money {
        float: right;
        font-weight: bold;
      }
    }
    .detail-message {
      padding: .2rem .12rem .3rem .08rem;
      .message-title {
        border-bottom: .01rem solid #EEEEEE;
        .healer-message {
          position: relative;
          padding-left: .04rem;
          .doctor-icon {
            color: #F79465;
          }
          .doctor-name {
            font-weight: bold;
          }
          .hospital-name {
            margin-left: .12rem;
            color: #999999;
          }
          .visit-time {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .patient-message {
          margin-left: .22rem;
        }
      }
      .drug-state {
        margin-top: .18rem;
        .content {
          position: relative;
        }
        .state {
          padding: .15rem 20% .1rem;
        }
      }
      .distributio-state {
        .content {
          position: relative;
          .order-number {
            position: absolute;
            right: 0;
            bottom: 0;
            font-weight: normal;
          }
        }
      }
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
