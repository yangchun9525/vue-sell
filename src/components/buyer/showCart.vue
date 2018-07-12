<template>
  <div id="app">
    <img src="../../assets/logo.png">

    <div class="showCart_cart">
      <ul>
        <li v-for="(cartItem,index) in cartList" class="showCart_product_li">

          <div class="showCart_selectRow" @click="statusSelect(index)">
            <!--<p>{{cartItem.name}}</p>-->
            <div v-if="cartItem.selectStatus">
              <img src="../../img/yesSelect.png" alt="" class="showCart_selectBtn">
            </div>
            <div v-else>
              <img src="../../img/noSelect.png" alt="" class="showCart_selectBtn">
            </div>
          </div>

          <div class="showCart_right_div">
            <p class="showCart_product_name">{{cartItem.name}}</p>
            <p class="showCart_product_price">{{cartItem.allPrice}}</p>
            <div style="flex: 1">
              <img src="../../img/cut.png" alt="" class="showCart_add_dec_btn" @click="cutCount(index)">
              <span class="showCart_count">{{cartItem.count}}</span>
              <img src="../../img/add.png" alt="" class="showCart_add_dec_btn" @click="addCount(index)">
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="showCart_bottom" @click="createOrder">
      <span>结算</span>
    </div>


  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Qs from 'qs';

  export default {
    data() {
      return {}
    },

    computed: {
      ...mapState(['cartList']),
    },
    methods: {
      cutCount(index) {
        var cartItem = this.cartList[index];
        var count = cartItem.count;
        if (count > 0) {
          cartItem.count = cartItem.count - 1;
          cartItem.allPrice = (cartItem.price * cartItem.count).toFixed(1);
          this.$store.commit("insertCartListInShowCart", cartItem);
        }
      },
      addCount(index) {
        var cartItem = this.cartList[index];
        cartItem.count = cartItem.count + 1;
        console.log()
        cartItem.allPrice = (cartItem.price * cartItem.count).toFixed(1);
        this.$store.commit("insertCartListInShowCart", cartItem);
      },
      createOrder() {
        var items = "[";
        for (var i = 0; i < this.cartList.length; i++) {
          if (i != this.cartList.length - 1) {
            items = items + "{'productId':'" + this.cartList[i].id + "','productQuantity':'" + this.cartList[i].count +
              "'},";
          } else {
            items = items + "{'productId':'" + this.cartList[i].id + "','productQuantity':'" + this.cartList[i].count +
              "'}";
          }
        }
        items = items + "]";
        console.log(items);
        const data = Qs.stringify(
          {
            name: "李四",
            phone: "18598745612",
            address: "慕课网总部",
            openid: "123456789",
            items: items
          })
        if (this.cartList.length == 0) {
          this.$Modal.error({
            title: '通知',
            content: '<p>购物车没内容</p>',
          });
        } else {
          this.$http.post('http://192.168.1.141:8083/sell/buyer/order/create',
            data,
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
          ).then(response1 => {
            console.log(response1.data.code)
            if (response1.data.code == 0) {
              this.$store.commit("clearShopCart");
            }
            console.log(response1);
          }).catch(function (err) {
          });
        }
      },
      statusSelect(index) {
        this.cartList[index].selectStatus = !this.cartList[index].selectStatus;
      }
    }
  }
</script>

<style>
  .showCart_cart {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .showCart_product_li {
    margin-left: 30px;
    margin-right: 30px;
    height: 50px;
    display: flex;
  }

  .showCart_selectRow {
    height: 50px;
    font-size: 0;
    line-height: 50px;
  }

  .showCart_selectBtn {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  .showCart_right_div {
    float: right;
    flex: 1;
    display: flex;
    height: 50px;
    line-height: 50px;
    border: 1px dashed #acd598;
    margin-left: 20px
  }

  .showCart_product_name {
    /*width: 100px;*/
    text-align: left;
    margin-left: 20px
  }

  .showCart_product_price {
    margin-left: 20px
  }

  .showCart_add_dec_btn {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .showCart_count {
    display: inline-block;
    width: 33px;
    text-align: center;
    font-size: 10px;
    vertical-align: bottom;
  }

  .showCart_bottom {
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

