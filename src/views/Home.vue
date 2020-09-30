<template>
  <div class="home">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button><br/>
    获取vuex getters：{{ getTest }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getTest'])
  },
  components: {
  }
}
</script>
