const Tool = {
  isLogin(){
    return !!localStorage.getItem('MYTOKEN')
  }
}

module.exports = Tool