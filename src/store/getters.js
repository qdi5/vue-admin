const getters = {
  // 注意，这里要加上模块名user
  token: state => state.user.token,
  getTest: state => state.user.test
}

export default getters
