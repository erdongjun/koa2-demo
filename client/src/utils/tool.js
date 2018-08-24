const Tool = {
  isLogin(){
    return !!localStorage.getItem('MYTOKEN') || !!localStorage.getItem('USERINFO')
  },
  getUserInfo(){
    return  JSON.parse(localStorage.getItem('USERINFO'))
  },
  getMainMenuName(menulist){
    const hash = location.hash.replace('#/','/') 
    let name = ''
    menulist.map(item => {
      if(item.key === hash){
        name = item.name
      }
    })
    return name
  }
}

module.exports = Tool