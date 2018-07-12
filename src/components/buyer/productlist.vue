<template>
  <div id="app">
    <img src="../../assets/logo.png">
    <p @click="toOrderList">查看订单</p>
    <p @click="toShowCart">查看购物车</p>
    <p @click="toSeller">进入卖家端</p>

    <div style="width: 100%;text-align: center;margin-top: 20px;">
      <ul style="text-align: center;">
        <li v-for="categoryItem in categoryList">
          <p style="text-align: left;margin-left: 30px">{{categoryItem.name}}</p>
          <ul>
            <li v-for="productItem in categoryItem.foods" @click="addToShopCart(productItem)">
              <p style="text-align: left;margin-left: 50px">{{productItem.name}} {{productItem.price}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <Modal
      v-model="showModal"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="productList_shopCart_goodCount">
        <span class="productList_shopCart_dec" @click="cutCount()"></span>
        <span class="productList_shopCart_count">{{selectCount}}</span>
        <span class="productList_shopCart_add" @click="addCount()"></span>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Qs from 'qs';

  export default {
    data() {
      return {

        title: "加入购物车",
        selectProduct: {},  //当前选中的产品
        selectCount: 0,     //当前选中产品的数量
        showModal: false,   //是否显示modal
        categoryList: []    //后台请求到的数据
      }
    },
    mounted() {
      this.getList();
    },
    computed: {
      ...mapState(['cartList']),
    },
    methods: {
      cutCount() {
        if (this.selectCount >= 1) {
          this.selectCount = this.selectCount - 1;
        }
      },
      addCount() {
        this.selectCount = this.selectCount + 1;
      },
      ok() {
        const selectProductData = {
          id: this.selectProduct.id,
          name: this.selectProduct.name,
          price: this.selectProduct.price,
          allPrice: (this.selectProduct.price * this.selectCount).toFixed(1),
          count: this.selectCount,
          selectStatus: true
        };

        if (this.selectCount > 0) {
          this.$store.commit("insertCartList", selectProductData);
        }
      },
      cancel() {

      },
      toShowCart() {
        this.$router.push({
          name: 'showCart'
        });
      },
      getList() {
        this.$http.get('http://192.168.1.141:8083/sell/buyer/product/list').then(response1 => {
          console.log(response1);
          var res = response1.data.data;
          this.categoryList = res;
          console.log(res);
        }).catch(function (err) {
        });
      },
      addToShopCart(productItem) {
        this.selectCount = 0;
        this.selectProduct = productItem;
        this.title = "加入购物车--" + productItem.name;
        this.showModal = true;
      },
      toOrderList() {
        this.$router.push({
          name: 'orderList'
        });
      },
      toSeller(){
        this.$router.push({
          name: 'sellerLogin'
        });
      }
    }
  }
</script>

<style>
  .productList_shopCart_goodCount {
    text-align: center;
  }

  .productList_shopCart_count {
    display: inline-block;
    width: 33px;
    text-align: center;
    font-size: 16px;
    vertical-align: bottom;
  }

  .productList_shopCart_add {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('../../img/add.png') no-repeat;
    background-size: cover;
  }

  .productList_shopCart_dec {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('../../img/cut.png') no-repeat;
    background-size: cover;
  }

</style>

