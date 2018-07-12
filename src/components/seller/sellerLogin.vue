<template>
  <div id="app">
    <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>

    <div>
      <Button type="primary" @click="login">登录</Button>
      <Button type="primary" @click="logout">登出</Button>
      <Button type="primary" @click="getAllProductList">获取订单列表</Button>
    </div>

    <Upload action="http://192.168.1.141:8083/sell/buyer/product/testuploadimg">
      <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>

  </div>
</template>
<script>

  export default {
    data() {
      return {
        value: 'abc'
      }
    },
    methods: {
      login() {
        this.$http.defaults.withCredentials = true;
        this.$http.get('http://192.168.1.141:8083/sell/seller/login', {
          params: {
            openid: this.value
          }
        }).then(response => {
          console.log(response)
        }).catch(function (err) {
        });
      },
      logout() {
        this.$http.get('http://192.168.1.141:8083/sell/seller/logout').then(response => {
          console.log(response)
        }).catch(function (err) {
        });
      },
      getAllProductList() {
        this.$http.get('http://192.168.1.141:8083/sell/seller/product/list').then(response => {
          console.log(response)
        }).catch(function (err) {
        });
      }
    }
  }
</script>
