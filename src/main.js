import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import iView from 'iview'; //ui组件
import 'iview/dist/styles/iview.css'; // ui组件
import Vuex from 'vuex';

Vue.prototype.$http = axios;

Vue.use(iView);
Vue.use(Vuex);

const store = new Vuex.Store({      //定义vuex
  state: {
    cartList: [],        //购物车列表
  },
  mutations: {
    insertCartList(state, obj) {          //插入本地购物车列表
      //记录是否有的flag
      var flag = false;
      //记录有的情况下的位置
      var j = -1;
      //判断当前购物车中是否有已经加过的数据
      for (var i = 0; i < state.cartList.length; i++) {
        if (state.cartList[i].id === obj.id) {
          flag = true;
          j = i;
          break;
        }
      }

      if (flag) {
        state.cartList[j].count = state.cartList[j].count + obj.count;
        state.cartList[j].allPrice = state.cartList[j].allPrice + obj.allPrice;
      } else {
        state.cartList.push(obj);
      }
    },
    //插入本地购物车列表
    insertCartListInShowCart(state, obj) {
      //记录是否有的flag
      var flag = false;
      //记录有的情况下的位置
      var j = -1;
      //判断当前购物车中是否有已经加过的数据
      for (var i = 0; i < state.cartList.length; i++) {
        if (state.cartList[i].id === obj.id) {
          flag = true;
          j = i;
          break;
        }
      }

      if (flag) {
        state.cartList[j].count = obj.count;
        state.cartList[j].allPrice = obj.allPrice;
      } else {
        state.cartList.push(obj);
      }
    },
    //清空购物车
    clearShopCart(state){
      state.cartList.splice(0, state.cartList.length);
    }
  }
});

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
  // render: h => h(App)
})
