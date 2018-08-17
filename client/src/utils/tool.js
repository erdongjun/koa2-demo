const Tool = {
  isLogin(){
    return !!localStorage.getItem('MYTOKEN') || !!localStorage.getItem('USERINFO')
  },
  getUserInfo(){
    return  JSON.parse(localStorage.getItem('USERINFO'))
  }
}

module.exports = Tool