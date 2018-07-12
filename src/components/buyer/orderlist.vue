<template>
  <div class="root">

    <img src="../../assets/logo.png" style="height: 20%;">
    <scroll ref="orderListScroll"
            class="scroll"
            :pullup="pullup"
            @scrollToEnd="loadMoreOrderListData"
            :pulldown="pulldown"
            @scrollToTop="refreshData">
      <div style="margin-top: 20px">
        <div v-show="showRefresh">
          <div v-if="isRefresh">
            <img src="../../img/loadding.gif" alt="" style="width: 30px;height: 30px">
          </div>
          <div v-else>
            <div><p>下拉刷新</p></div>
          </div>
        </div>

        <ul style="text-align: center;">

          <li v-for="(orderItem,index) in orderList" >
            <div @click="toOrderDetail(index)">
              <p>{{index}}</p>
              <h1>{{orderItem.orderAmount}}</h1>
              <p>{{orderItem.orderId }}</p>

              <ul style="text-align: center;">
                <li v-for="orderDetailItem in orderItem.orderDetailList">
                  <p>{{orderDetailItem.productName }}</p>
                  <p>{{orderDetailItem.productIcon }}</p>
                </li>
              </ul>
            </div>
            <h2>---------------------------</h2>
          </li>
        </ul>

        <div v-show="showMore">
          <div v-if="havemore">
            <div v-if="nowloading">
              <!--<img src="../../img/loadding.gif" alt="" style="width: 100px;">-->
              <div><p>加载中</p></div>
            </div>
            <div v-else>
              <div><p>上拉加载更多</p></div>
            </div>
          </div>
          <div v-else>
            <div>
              <p>已全部加载</p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import Scroll from '../base/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        orderList: [],

        pulldown: true,  //下拉刷新
        pullup: true,   //上拉加载

        totalPage: 1,        //总共的页数
        currentPage: 0,            //当前第几页
        rows: 10,           //每页多少条
        count: 11,         //总共的博客数量

        showRefresh: false,     //是否显示刷新
        isRefresh: false,     //是否在刷新

        havemore: true,    //加载全部数据
        moreText: "上拉加载更多",
        nowloading: false,    //显示加载图标
        showMore: true,
      }
    },
    mounted() {
      this.getOrderList();
      setTimeout(() => {
        this.$refs.orderListScroll.refresh();
      }, 20)
    },
    methods: {
      refreshData() {
        this.showRefresh = true;
        this.isRefresh = true;
        this.currentPage = 0;
        console.log("refreshData");
        this.getOrderList();
      },
      getOrderList() {
        this.$http.get('http://192.168.1.141:8083/sell/buyer/order/list?openid=123456789&page=' + this.currentPage).then(response1 => {
          console.log(response1);
          var res = response1.data.data;
          this.count = response1.data.allSize;
          this.totalPage = Math.ceil(this.count / this.rows);

          if (this.currentPage == 0) {

            setTimeout(() => {
              this.orderList = res;
              this.showRefresh = false;
            }, 2000)
            this.havemore = true;
          } else {

            this.nowloading = false;
            this.orderList = this.orderList.concat(res);

            if (this.currentPage == this.totalPage - 1) {
              this.havemore = false;
            } else {
              this.havemore = true;
            }

          }
          console.log(res);
        }).catch(function (err) {
        });
      },
      loadMoreOrderListData() {

        this.currentPage = this.currentPage + 1;
        this.nowloading = true;
        console.log("loadMoreOrderListData");
        if (this.currentPage < this.totalPage) {
          this.getOrderList();
        }
      },
      test(){
        this.$Modal.error({
          title: '通知',
          content: '<p>购物车没内容</p>',
        });
      },
      toOrderDetail(index) {
        this.$router.push({
          name: 'orderDetail', params: {
            "orderId": this.orderList[index].orderId
          }
        });
      }
    }
  }
</script>
<style>
  .root {
    width: 100%;
    height: 100%;
  }
  .scroll {
    margin-top: 5%;
    width: 100%;
    height: 75%;
    overflow: hidden;
  }

</style>
