<template>
  <div id="infowindowvue">
    <h4>{{ data.relname }}</h4>
    <div class="contentInfo" @click="GolinkcableCard(data)">
      <el-row>
        <el-col v-for="item in data.cableList" :key="item.name">
          <div>
            <el-row>
              <el-col :span="4">
                <img width="25" :src="item.icon">
              </el-col>
              <el-col :span="20">
                <span style="line-height:26px;">{{ item.cablename }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:3px;">
              <el-col :span="24">
                <span class="spancontent">设备状态: </span><el-tag size="small" :type="item.status | tagstatusFilter"> {{ item.status | devicestatusFilter }}</el-tag>
              </el-col>
              <el-col v-if="item.status === 'OffLine'" :span="24">
                <span class="spancontent">告警情况: </span>
                <el-tag style="margin-top:3px;" size="small" type="info"> {{ item.alertflag }}</el-tag>
              </el-col>
              <el-col v-else :span="24">
                <span class="spancontent">告警情况: </span>
                <el-tag style="margin-top:3px;" size="small" :type="item.alertflag | alertflagFilter"> {{ item.alertflag }}</el-tag>
              </el-col>
            </el-row>
            <!-- 状态为Online情况时—————————————————————————————————————————————————————————— -->
            <div v-if="item.valuelist.length !==0 && item.status === 'OnLine' ">
              <el-row style="margin-top:3px;">
                <!-- 门禁、井盖控制器、锁杆 -->
                <el-col v-if="item.cable_type === 'Door' || item.cable_type === 'Cover Motor' || item.cable_type === 'Cover Pole'" :span="24">
                  <span class="spancontent">开关状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchFilter">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                </el-col>
                <!-- 接地电流 -->
                <el-col v-if="item.cable_type === 'Ground current'" :span="24">
                  <span class="spancontent">{{ item.cable_id | changeCurrentShow }}</span>：&nbsp;&nbsp;&nbsp;<span style="color:#de4714">{{ changExpressValue(item) }}</span>（A）
                </el-col>
                <!-- 水泵控制器、风机控制器、灯光控制器 -->
                <el-row v-if="item.cable_type === 'Fan' || item.cable_type === 'Pump' || item.cable_type === 'Lamp'">
                  <el-row v-if="item.valuelist.length ===12">
                    <el-col :span="24">
                      <span class="spancontent">开关状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchFilter">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">运行模式: </span><el-tag size="small">{{ item.valuelist[11].value | changeYunxingModel }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">A相电流: &nbsp;&nbsp;&nbsp;{{ item.valuelist[1].value }}A</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">B相电流: &nbsp;&nbsp;&nbsp;{{ item.valuelist[2].value }}A</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">C相电流: &nbsp;&nbsp;&nbsp;{{ item.valuelist[3].value }}A</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">BA线电压: &nbsp;&nbsp;&nbsp;{{ item.valuelist[5].value }}V</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">AC线电压: &nbsp;&nbsp;&nbsp;{{ item.valuelist[6].value }}V</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">CB线电压: &nbsp;&nbsp;&nbsp;{{ item.valuelist[7].value }}V</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">有功功率: &nbsp;&nbsp;&nbsp;{{ item.valuelist[8].value }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">无功功率: &nbsp;&nbsp;&nbsp;{{ item.valuelist[9].value }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">视在功率: &nbsp;&nbsp;&nbsp;{{ item.valuelist[10].value }}</span>
                    </el-col>
                  </el-row>
                  <el-row v-if="item.valuelist.length ===3">
                    <el-col :span="24">
                      <span class="spancontent">运行状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchFilter">{{ item.valuelist[0].value | changeYunxing }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">运行模式: </span><el-tag size="small">{{ item.valuelist[1].value | changeYunxingModel }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">固件状态: </span><el-tag size="small" :type="item.valuelist[2].value | switchAlarmFilter">{{ item.valuelist[0].value | changeGujian }}</el-tag>
                    </el-col>
                  </el-row>
                  <el-row v-if="item.valuelist.length ===1">
                    <el-col :span="24">
                      <span class="spancontent">开关状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchFilter">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                    </el-col>
                  </el-row>
                </el-row>
                <!-- 电容电压、电机电流、氧气、一氧化碳、甲烷、硫化氢、水位、AI -->
                <el-col v-if="item.cable_type === 'Cover CVOLT'|| item.cable_type === 'Cover Motocurrent'|| item.cable_type === 'O2' || item.cable_type === 'AI' || item.cable_type === 'CO'|| item.cable_type === 'CH4'|| item.cable_type === 'H2S'" :span="24">
                  <span class="spancontent">值: &nbsp;&nbsp;&nbsp;<span style="color:#de4714">{{ changExpressValue(item) }}</span></span>
                </el-col>
                <!-- 倾角 -->
                <el-row v-if="item.cable_type === 'Cover Angle'" type="flex" justify="space-around">
                  <el-col :span="6">
                    <span>Z: {{ item.valuelist[0].value }}°</span>
                  </el-col>
                  <el-col :span="6">
                    <span>Y: {{ item.valuelist[1].value }}°</span>
                  </el-col>
                  <el-col :span="6">
                    <span>X: {{ item.valuelist[2].value }}°</span>
                  </el-col>
                </el-row>
                <!-- 震动 -->
                <el-row v-if="item.cable_type === 'Cover Intensity'">
                  <el-col :span="24">
                    <span class="spancontent">状态:</span><el-tag size="small" :type="item.valuelist[0].value | switchFilter">{{ item.valuelist[0].value | changeVibration }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 接头温度  -->
                <el-row v-if="item.cable_type === 'MDTS'">
                  <el-col v-for="s in item.valuelist" :key="s.id">
                    <el-row>
                      <el-col :span="11">
                        <span style="margin-left:12px;">温度ID: {{ s.id }}</span>
                      </el-col>
                      <el-col :span="12">
                        <span style="margin-left:12px;">值：{{ s.value }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <!-- 无线烟感报警器 -->
                <el-row v-if="item.cable_type === 'Smoke'">
                  <el-col :span="24">
                    <span class="spancontent">火警状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchAlarmFilter">{{ item.valuelist[0].value | changeAlarmStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;{{ item.valuelist[1].value }}V</span>
                  </el-col>
                </el-row>
                <!-- 无线温湿度 -->
                <el-row v-if="item.cable_type === 'Wireless Humiture'">
                  <el-col :span="24">
                    <span class="spancontent">温度: &nbsp;&nbsp;&nbsp;{{ item.valuelist[0].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">湿度: &nbsp;&nbsp;&nbsp;{{ item.valuelist[1].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;{{ item.valuelist[2].value }}V</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">防拆状态: </span><el-tag size="small">{{ item.valuelist[3].value | changeFangChaiStatus }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 无线甲烷报警器 -->
                <el-row v-if="item.cable_type === 'Wireless CH4 Alarm'">
                  <el-col :span="24">
                    <span class="spancontent">燃气浓度值: &nbsp;&nbsp;&nbsp;{{ item.valuelist[0].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">传感器状态: </span><el-tag size="small">{{ item.valuelist[1].value | changech4Status }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;{{ item.valuelist[2].value }}V</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">防拆状态: </span><el-tag size="small">{{ item.valuelist[3].value | changeFangChaiStatus }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 无线一键报警器、无线水浸传感器、无线液位变送器、无线红外探测器-->
                <el-row v-if="item.cable_type === 'SOS Button' || item.cable_type === 'Wireless Water' || item.cable_type === 'Wireless Liquid' || item.cable_type === 'Wireless IR'">
                  <el-col :span="24">
                    <span class="spancontent">状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchAlarmFilter">{{ item.valuelist[0].value | changeAlarmStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;{{ item.valuelist[1].value }}V</span>
                  </el-col>
                </el-row>
                <!-- 单灯控制器 -->
                <el-row v-if="item.cable_type === 'Single Lamp'">
                  <el-col :span="24">
                    <span class="spancontent">电压: &nbsp;&nbsp;&nbsp;{{ item.valuelist[0].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电流: &nbsp;&nbsp;&nbsp;{{ item.valuelist[1].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">功率: &nbsp;&nbsp;&nbsp;{{ item.valuelist[2].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电量: &nbsp;&nbsp;&nbsp;{{ item.valuelist[3].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">开关状态: </span><el-tag size="small" :type="item.valuelist[4].value | switchFilter">{{ item.valuelist[4].value | changeSwitchStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">调光值: &nbsp;&nbsp;&nbsp;{{ item.valuelist[5].value }}</span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电压状态: </span><el-tag size="small">{{ item.valuelist[6].value | changeVCStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电流状态: </span><el-tag size="small">{{ item.valuelist[7].value | changeVCStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电量传感器状态: </span><el-tag size="small" :type="item.valuelist[8].value | switchAlarmFilter">{{ item.valuelist[8].value | changeDimmStatus }}</el-tag>
                  </el-col>
                </el-row>
              </el-row>
            </div>
            <!-- 状态为Offline情况时—————————————————————————————————————————————————————————— -->
            <div v-if="item.valuelist.length !==0 && item.status === 'OffLine' ">
              <el-row style="margin-top:3px;">
                <!-- 门禁、井盖控制器、锁杆 -->
                <el-col v-if="item.cable_type === 'Door' || item.cable_type === 'Cover Motor' || item.cable_type === 'Cover Pole'" :span="24">
                  <span class="spancontent">开关状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                </el-col>
                <!-- 接地电流 -->
                <el-col v-if="item.cable_type === 'Ground current'" :span="24">
                  <span class="spancontent">{{ item.cable_id | changeCurrentShow }}</span>：&nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ changExpressValue(item) }}</span>A
                </el-col>
                <!-- 断线检测 -->
                <el-col v-if="item.cable_type === 'Wire Detection'" :span="24">
                  <span class="spancontent">状态: </span><el-tag size="small" :type="item.valuelist[0].value | switchAlarmFilter">{{ item.valuelist[0].value | changeAlarmStatus }}</el-tag>
                </el-col>
                <!-- 水泵控制器、风机控制器、灯光控制器 -->
                <el-row v-if="item.cable_type === 'Fan' || item.cable_type === 'Pump' || item.cable_type === 'Lamp'">
                  <el-row v-if="item.valuelist.length ===12">
                    <el-col :span="24">
                      <span class="spancontent">开关状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">运行模式: </span><el-tag size="small" type="info">{{ item.valuelist[11].value | changeYunxingModel }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">A相电流: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[1].value }}A</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">B相电流: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[2].value }}A</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">C相电流: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[3].value }}A</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">BA线电压: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[5].value }}V</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">AC线电压: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[6].value }}V</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">CB线电压: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[7].value }}V</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">有功功率: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[8].value }}</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">无功功率: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[9].value }}</span></span>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">视在功率: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[10].value }}</span></span>
                    </el-col>
                  </el-row>
                  <el-row v-if="item.valuelist.length ===3">
                    <el-col :span="24">
                      <span class="spancontent">运行状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeYunxing }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">运行模式: </span><el-tag size="small" type="info">{{ item.valuelist[1].value | changeYunxingModel }}</el-tag>
                    </el-col>
                    <el-col :span="24">
                      <span class="spancontent">固件状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeGujian }}</el-tag>
                    </el-col>
                  </el-row>
                  <el-row v-if="item.valuelist.length ===1">
                    <el-col :span="24">
                      <span class="spancontent">开关状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeSwitchStatus }}</el-tag>
                    </el-col>
                  </el-row>
                </el-row>
                <!-- 电容电压、电机电流、氧气、一氧化碳、甲烷、硫化氢、水位、AI -->
                <el-col v-if="item.cable_type === 'Cover CVOLT'|| item.cable_type === 'Cover Motocurrent'|| item.cable_type === 'O2' || item.cable_type === 'AI' || item.cable_type === 'CO'|| item.cable_type === 'CH4'|| item.cable_type === 'H2S'" :span="24">
                  <span class="spancontent">值: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ changExpressValue(item) }}</span></span>
                </el-col>
                <!-- 倾角 -->
                <el-row v-if="item.cable_type === 'Cover Angle'" type="flex" justify="space-around">
                  <el-col :span="6">
                    <span style="color:#dedede">Z: {{ item.valuelist[0].value }}°</span>
                  </el-col>
                  <el-col :span="6">
                    <span style="color:#dedede">Y: {{ item.valuelist[1].value }}°</span>
                  </el-col>
                  <el-col :span="6">
                    <span style="color:#dedede">X: {{ item.valuelist[2].value }}°</span>
                  </el-col>
                </el-row>
                <!-- 震动 -->
                <el-row v-if="item.cable_type === 'Cover Intensity'">
                  <el-col :span="24">
                    <span class="spancontent">状态:</span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeVibration }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 接头温度  -->
                <el-row v-if="item.cable_type === 'MDTS'">
                  <el-col v-for="s in item.valuelist" :key="s.id">
                    <el-row>
                      <el-col :span="11">
                        <span style="margin-left:12px;color:#dedede">温度ID: {{ s.id }}</span>
                      </el-col>
                      <el-col :span="12">
                        <span style="margin-left:12px;color:#dedede">值：{{ s.value }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <!-- 无线烟感报警器 -->
                <el-row v-if="item.cable_type === 'Smoke'">
                  <el-col :span="24">
                    <span class="spancontent">火警状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeAlarmStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[1].value }}V</span></span>
                  </el-col>
                </el-row>
                <!-- 无线温湿度 -->
                <el-row v-if="item.cable_type === 'Wireless Humiture'">
                  <el-col :span="24">
                    <span class="spancontent">温度: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[0].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">湿度: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[1].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[2].value }}V</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">防拆状态: </span><el-tag size="small" type="info">{{ item.valuelist[3].value | changeFangChaiStatus }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 无线甲烷报警器 -->
                <el-row v-if="item.cable_type === 'Wireless CH4 Alarm'">
                  <el-col :span="24">
                    <span class="spancontent">燃气浓度值: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[0].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">传感器状态: </span><el-tag size="small" type="info">{{ item.valuelist[1].value | changech4Status }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[2].value }}V</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">防拆状态: </span><el-tag size="small" type="info">{{ item.valuelist[3].value | changeFangChaiStatus }}</el-tag>
                  </el-col>
                </el-row>
                <!-- 无线一键报警器、无线水浸传感器、无线液位变送器、无线红外探测器-->
                <el-row v-if="item.cable_type === 'SOS Button' || item.cable_type === 'Wireless Water' || item.cable_type === 'Wireless Liquid' || item.cable_type === 'Wireless IR'">
                  <el-col :span="24">
                    <span class="spancontent">状态: </span><el-tag size="small" type="info">{{ item.valuelist[0].value | changeAlarmStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电池电量状态: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[1].value }}V</span></span>
                  </el-col>
                </el-row>
                <!-- 单灯控制器 -->
                <el-row v-if="item.cable_type === 'Single Lamp'">
                  <el-col :span="24">
                    <span class="spancontent">电压: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[0].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电流: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[1].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">功率: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[2].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电量: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[3].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">开关状态: </span><el-tag size="small" type="info">{{ item.valuelist[4].value | changeSwitchStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">调光值: &nbsp;&nbsp;&nbsp;<span style="color:#dedede">{{ item.valuelist[5].value }}</span></span>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电压状态: </span><el-tag size="small" type="info">{{ item.valuelist[6].value | changeVCStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电流状态: </span><el-tag size="small" type="info">{{ item.valuelist[7].value | changeVCStatus }}</el-tag>
                  </el-col>
                  <el-col :span="24">
                    <span class="spancontent">电量传感器状态: </span><el-tag size="small" type="info">{{ item.valuelist[8].value | changeDimmStatus }}</el-tag>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <ul style="padding:0">
        <li>
          <span>所在隧道：</span>&nbsp;<span>{{ data.tunnel_name }}</span>
        </li>
        <li>
          <span>所在线路：</span>&nbsp;<span>{{ data.route_name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import router from '@/router'

export default {
  name: 'InfoWindowComponent',
  filters: {
    changeGujian(val) {
      var ret = val
      if (val === '1') {
        ret = '故障'
      } else {
        ret = '正常'
      }
      return ret
    },
    changeCurrentShow(val) {
      var ret = val
      if (val === 1) {
        ret = 'A相电流'
      } else if (val === 2) {
        ret = 'B相电流'
      } else if (val === 3) {
        ret = 'C相电流'
      } else if (val === 4) {
        ret = 'Z相电流'
      }
      return ret
    },
    changeYunxingModel(val) {
      var ret = val
      if (val === '0') {
        ret = '手动模式'
      } else {
        ret = '自动模式'
      }
      return ret
    },
    changeFangChaiStatus(val) {
      if (val === '1') {
        return '设备被拆'
      } else {
        return '没有被拆'
      }
    }
  },
  data() {
    return {
      data: { relname: '',
        cableAllList: [],
        cableList: [] }
    }
  },
  watch: {
    data(val) {
    }
  },
  methods: {
    GolinkcableCard(data) {
      router.push({
        path: '/monitoring-center/cableDetail',
        name: 'Cabledevice',
        params: { detail: data, routepage: 'dashboard' }
      })
    },
    changExpressValue(item) {
      return item.valuelist[0].value
      // if (item.expression !== '') {
      //   var expressValue = this.$options.filters['evalChange'](item.expression.replace('{v}', Number(item.valuelist[0].value)))
      //   return expressValue
      // } else {
      //   return item.valuelist[0].value
      // }
    }
  }
}
</script>

<style>
.contentInfo {
  width: 100%;
  height: 280px;
  overflow-y:auto;
  font-size: 14px;
  color:#2b2121;
  cursor: pointer;
}
.contentInfo::-webkit-scrollbar{
  width:6px;
  height: 6px;
  background-color: #f1f1f1;
  box-shadow:inset 0 0 6px rgba(0,0,0,0.22);
  border-radius: 15px;
}
.contentInfo::-webkit-scrollbar-track{
  background-color: #F5F5F5;
  box-shadow:inset 0 0 6px rgba(0,0,0,0.22);
  border-radius: 4px;
}
.contentInfo::-webkit-scrollbar-thumb{
  background-color: #a8a8a8;
  border-radius: 4px;
  height: 30px;
}
.spancontent{
  margin-left:35px;
}
.spancontentOff {
  margin-left:35px;
  color:#dedede;
}
</style>
