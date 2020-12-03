<template>
  <div>
		 <h4 > &nbsp;</h4>
    <hr class="black-line">
    <el-row>
      <el-col :span="24">
        <el-table :data="arrList" border style="margin-top:12px;">
          <el-table-column  v-for="(item,index) in tablekey" :key="index" :label="item.label" :prop="item.key" :width="item.width">
          </el-table-column>
         
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/**yushk  非固定表头表格
 * 20201126
 * 仅针对设备类型是接地电流和短线检测时 组合数据表格
*/
export default {
  name: 'FlexTable',
  props: {
    oridata: {
      type: Array,
      default: function() {
        return []
      }
    },
    detailname: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      arrList: [],
			tablekey:{},
      groundCurrentName: {
        1: 'A相电流',
        2: 'B相电流',
        3: 'C相电流',
        4: 'Z相电流',
        5: '断线检测',
      },
			current:{
				1: 'A相电流',
        2: 'B相电流',
        3: 'C相电流',
        4: 'Z相电流',
        5: '断线检测',
			},
			mdts:{
				1: 'A相温度',
        2: 'B相温度',
        3: 'C相温度',
			},
			water:{
				2:"水位1",
				1:"水位2"
			},
      WireJudge: {
        '0': '正常',
        '1': '报警'
      }
    }
  },
  computed: {
  },
  watch: {
    oridata:{
			handler:function(nval, oval){
      	this.analyseData(nval)
			},
      immediate: true
    },
		detailname(){
			this.tablekey = []
			this.arrList = []
		}
  },
  mounted() {
  },
  methods: {
    analyseData(data) {
			if(!Array.isArray(data)||data.length===0 ){ 
				return
			}
			// if(data[0].device_attribute.attribute.code==="Ground current"){ // 判断为电流设置 表头
			// 	this.groundCurrentName = this.current
			// }else{
			// 	this.groundCurrentName = this.mdts // 温度设置表头
			// }	
			this.groundCurrentName = this.getTablehead(data[0].device_attribute.attribute.code)
			this.tablekey = []
			this.tablekey.push({key:"time",label:"时间",width:200})
			var obj = {}
			for(let item of data){
			this.tablekey.push({
				key:String(item.device_attribute.cable_id),
				label:this.groundCurrentName[item.device_attribute.cable_id],
				width:80
				})
				obj[item.device_attribute.cable_id] = item.mon_data.cable.list[0].value
				obj["time"]=item.mon_data.time
			}
			// 过滤重复数据
			if(this.arrList.length===0||this.arrList[this.arrList.length-1].time!==obj["time"]){
				this.arrList.push(obj)
			}
			if(this.arrList.length>10){
				this.arrList.shift()
			}
    },
		getTablehead(code){
			switch(code){
				case "Ground current":
					return  this.current
				case "MDTS":
					return  this.mdts
				case "Water":
					return  this.water
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
