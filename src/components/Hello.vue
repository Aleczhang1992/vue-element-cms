<template>
  <div class="hello">
  	
  	<img class="logo" src="../assets/logo.png">
 	<p class="welcome">欢迎使用进入测试页面1！</p>
	
<div v-html="content"></div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
//import { Navbar, TabItem, TabContainer, TabContainerItem, Cell, Indicator } from 'mint-ui'
//
//Vue.component(Navbar.name, Navbar)
//Vue.component(TabItem.name, TabItem)
//Vue.component(TabContainer.name, TabContainer)
//Vue.component(TabContainerItem.name, TabContainerItem)
//Vue.component(Cell.name, Cell)

export default {
  name: 'hello',
  data () {
    return {
      selected: '1',
      title: 'Hello Vue!',
      content: ''
    }
  },
  components: {
//  'mt-navbar': Navbar,
//  'mt-tab-item': TabItem,
//  'mt-tab-container': TabContainer,
//  'mt-tab-container-item': TabContainerItem,
//  'mt-cell': Cell,
  },
  methods: {
      async getContent () {
        const response = await fetch('/api/testData');
        this.content = await response.text();
        
      }
    },
   //计算属性
  computed: mapState([
      'message'
    ]),
  created(){
  	 	
  },
  mounted () {
  	//组件加载时
  	//修改state中的message

  	
      this.$store.commit('MESSAGE', '欢迎使用-- vue！');
      //调用接口获取内容
      this.getContent();
    },
}

 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
