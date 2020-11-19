export default {
  // 获取token
  getToken: state => state.user.token,
  // 获取角色
  getRoles: state => state.user.roles,
  // 获取头像
  getAvatar: state => state.user.avatar,
  // 获取用户名
  getName: state => state.user.name,
  // 获取用户有权访问的路由
  getPermissionRoutes: state => state.permission.routes
}
