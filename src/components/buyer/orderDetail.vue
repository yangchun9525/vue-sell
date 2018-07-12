<template>
  <div id="app">
    <p>orderDetail</p>
    <p>{{orderId}}</p>
    <p>买家姓名：{{orderDetailData.buyerName}}</p>
    <p>买家电话：{{orderDetailData.buyerPhone}}</p>
    <p>买家地址：{{orderDetailData.buyerAddress}}</p>
    <p>买家openid：{{orderDetailData.buyerOpenid}}</p>
    <p>总金额：{{orderDetailData.orderAmount}}</p>
    <p>创建时间：{{ orderDetailData.createTime}}</p>
    <p>修改时间：{{orderDetailData.updateTime}}</p>
    <p>订单状态：{{orderDetailData.orderStatus == 0 ? "新订单": orderDetailData.orderStatus == 1 ? "完结":"已取消"}}</p>
    <p>支付状态：{{orderDetailData.payStatus== 0 ? "等待支付":"支付成功"}}</p>
    <ul>
      <li v-for="orderItem in orderDetailData.orderDetailList"
          class="orderDetail_product_bg">
        <p>商品id:{{orderItem.productId}}</p>
        <p>商品名称:{{orderItem.productName}}</p>
        <p>商品价格:{{orderItem.productPrice}}</p>
        <p>商品购买量:{{orderItem.productQuantity}}</p>
        <p>商品图片地址:{{orderItem.productIcon}}</p>
      </li>
    </ul>

    <div v-show="showCancelOrder" class="orderDetail_bottom" @click="cancelOrder">
      <span>取消订单</span>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        orderId: '',
        orderDetailData: {},
        showCancelOrder: false
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.path.indexOf("orderDetail") > -1) {
          var orderId = this.$route.params.orderId;
          this.orderId = orderId;
          this.getOrderDetail();
        }
      }
    },
    created() {
      var orderId = this.$route.params.orderId;
      this.orderId = orderId;
      this.getOrderDetail();
    },
    methods: {
      getOrderDetail() {
        this.$http.get('http://192.168.1.141:8083/sell/buyer/order/detail', {
          params: {
            openid: "123456789",
            orderId: this.orderId
          }
        }).then(response => {
          console.log(response.data);
          response.data.data.createTime = this.convertTime(response.data.data.createTime * 1000);
          response.data.data.updateTime = this.convertTime(response.data.data.updateTime * 1000);
          this.orderDetailData = response.data.data;
          this.orderDetailData.orderStatus == 0 ? this.showCancelOrder = true : this.showCancelOrder = false

        }).catch(function (err) {
        });
      },
      convertTime(time) {
        var date = new Date(time);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        var h = "0" + date.getHours();
        var min = "0" + date.getMinutes();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "  " + h.substring(h.length - 2, h.length) + ":" + min.substring(min.length - 2, min.length);
      },
      cancelOrder() {
        let param = new URLSearchParams();
        param.append("openid", "123456789");
        param.append("orderId", this.orderId);

        this.$http.post('http://192.168.1.141:8083/sell/buyer/order/cancel',
          param
        ).then(response => {
          console.log(response.data);
          this.orderDetailData.orderStatus = 2;
          this.showCancelOrder = false
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }
</script>
<style>
  .orderDetail_product_bg {
    border: 1px dashed #acd598;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 30px
  }

  .orderDetail_bottom {
    position: fixed;
    bottom: 0px;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    background: #fff;
    box-shadow: 0px 0px 15px #888888;
    font-size: 15px;
  }
</style>
