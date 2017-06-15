<template>
  <div class="innerContent">
	<el-input
  placeholder="请选择日期"
  style="width: 30%"
  icon="search"
  v-model="input2"
  :on-icon-click="handleIconClick">
</el-input>
  	 <el-table
  	ref="multipleTable"
  	v-loading="loading"
    element-loading-text="拼命加载中"
    :data="newsList"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column label="新闻列表" align="center">
     <el-table-column
      type="selection"
      @selectable='toggleSelection'
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="articleId"
      label="文章ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="columnName"
      label="栏目"
      width="120">
    </el-table-column>
    <el-table-column
      prop="pubTime"
      :formatter="dateFormat"
      label="发布时间"
      width="300">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="dialogTableVisible = true" type="text" size="small">查看</el-button>
        <el-button type="text" @click="dialogFormVisible = true" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
  <div class="toolBar">
  	<el-button type="primary" icon="el-icon-plus">添加</el-button>
  	<el-button type="primary" icon="el-icon-delete">删除</el-button>
  </div>
  <div class="block">
  	
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total,prev, pager, next, jumper"
      :total="20"
      
      >
    </el-pagination>
  </div>
	<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>
<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
	
	
  </div>
</template>

<script>

import {mapState} from 'vuex'


export default {
  name: 'newsList',
  data () {
    return {
      
        content:[],
        multipleSelection: [],
        currentPage:1,
        input2: '',
        loading:true,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
   
    }
  },
  components: {

  },
  methods: {
      async getNewsList () {
        const response = await fetch('http://7xuuaz.com1.z0.glb.clouddn.com/newsData.json',{
  		method:"GET",
//		headers:{
//			'Content-Type': 'application/json',
//		},
//		body:JSON.stringify(drugMess)
  		}).then((response)=>{
			return response.json();
		}).then((json)=>{
			return json;
		});
//    	this.content = response.list;
//      console.log("this.content",this.content);
		 this.$store.commit('NEWSLIST', response.list);
		 let that=this;
		 setTimeout(()=>that.loading=false,3000)
		 
      },
      handleClick() {
        console.log(1);
      },
        //时间格式化  
      dateFormat(row, column) {  
          var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return new Date(date*1000).toLocaleString();  
       },
       handleSelectionChange(val) {
       	console.log("val",val);
       	
        this.multipleSelection = val;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
       handleIconClick(ev) {
	      console.log(ev);
	    }
    },
   //计算属性
  computed: mapState([
      'message',
      'newsList'
    ]),
  created(){
  	 	
  },

  mounted () {
  	//组件加载时
  	//修改state中的message

  	
      this.$store.commit('MESSAGE', '欢迎使用-- vue！');
      //调用接口获取内容
      this.getNewsList () ;
    },
}

 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block{
	margin: 20px auto;
    width: 45%;
    display: inline-block;
}
.toolBar{
	width: 45%;
	display: inline-block;
}
</style>
