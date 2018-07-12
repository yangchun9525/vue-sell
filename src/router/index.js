import Vue from 'vue'
import Router from 'vue-router'
import productList from '../components/buyer/productlist'
import orderList from '../components/buyer/orderlist'
import showCart from '../components/buyer/showCart'
import orderDetail from '../components/buyer/orderDetail'
import HelloWorld from '../components/HelloWorld'

import sellerLogin from '../components/seller/sellerLogin'

Vue.use(Router);

export default new Router({

  routes: [
    {
      path: '/',
      redirect: '/home'       //默认跳转主页
    },
    {
      path: '/home',      //主页
      component: productList
    },
    {
      path: '/orderList',      //订单列表
      name: 'orderList',
      component: orderList
    },
    {
      path: '/showCart',      //购物车
      name: 'showCart',
      component: showCart
    },
    {
      path: '/orderDetail',      //订单详情
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/HelloWorld',      //测试
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sellerLogin',      //卖家登录
      name: 'sellerLogin',
      component: sellerLogin
    },
  ]
})
