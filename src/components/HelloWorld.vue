<template>
  <scroll class="wrapper"
          :data="data"
          :pulldown="pulldown"
          @pulldown="loadData">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
    <!--<div class="loading-wrapper"></div>-->
  </scroll>
</template>
<script>
  import Scroll from './base/scroll/scroll'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        data: [1,2,3,4,5],
        pulldown: true
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        setTimeout(() => {
          const last = this.data[this.data.length - 1];
          for (let i = 1; i < 11; i++) {
            this.data.push(last + i);
          }
          // resolve();
        }, 2000);
        // requestData().then((res) => {
        //   this.data = res.data.concat(this.data)
        // })
      }
    }
  }
</script>
