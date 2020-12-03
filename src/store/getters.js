const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  id: state => state.user.id,
  currentRole: state => state.user.currentRole,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  userInfo: state => state.user.userInfo,
  message: state => state.socket.message,
  alertNum: state => state.socket.alertNum,
  currentDeviceData: state => state.socket.currentDeviceData,
  auth: state => state.socket.auth,
  deviceInfo: state => state.socket.deviceInfo

}
export default getters