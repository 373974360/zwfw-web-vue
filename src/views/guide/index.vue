<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div>按部门分类</div>
        <el-menu mode="vertical" theme="dark">
          <template v-for="item in deptList">
            <el-menu-item :index="item.deptId" @click="showService(item)">{{item.deptName}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <ul>
          <li v-for="item in serviceList">
            <p>{{item.serviceName}}</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'service_guide',
    data() {
      return {
        deptList: [
          {deptId: 1, deptName: '经发局', deptItems: [
            {serviceId: 1, serviceName: '食品经营许可证'},
            {serviceId: 2, serviceName: '餐饮服务许可证注销'},
            {serviceId: 3, serviceName: '食品经营许可证注销'},
            {serviceId: 4, serviceName: '外商投资项目核准'},
          ]},
          {deptId: 2, deptName: '国土局', deptItems: [
            {serviceId: 5, serviceName: '餐饮服务许可证注销'},
            {serviceId: 6, serviceName: '食品经营许可证'},
            {serviceId: 7, serviceName: '外商投资项目核准'},
            {serviceId: 8, serviceName: '食品经营许可证注销'},
          ]},
          {deptId: 3, deptName: '规划局'},
          {deptId: 4, deptName: '建设局'},
          {deptId: 5, deptName: '市容环保局'},
          {deptId: 6, deptName: '社会事业局'},
          {deptId: 7, deptName: '组织人事局'},
          {deptId: 8, deptName: '工商局'},
          {deptId: 9, deptName: '国税局'}
        ],
        serviceList: []
      }
    },
    methods: {
      showService(dept) {
        this.serviceList = dept.deptItems;
      }
    }
  }
</script>
