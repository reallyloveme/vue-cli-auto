export default{
  setCookie(name,value,obj){//设置cookie
      let config = {
          type:"天"
      }
      if(obj){
          Object.assign(config,obj);
      }
      let oDate = new Date();
      let expires = null;
      if(config.expires){
          if(config.type){
              switch (config.type){
                  case '秒':
                      oDate.setSeconds(oDate.getSeconds() + config.expires)
                      expires = oDate.toUTCString();
                  break;
                  case '分':
                      oDate.setMinutes(oDate.getMinutes() + config.expires)
                      expires = oDate.toUTCString();
                  break;
                  case '时':
                      oDate.setHours(oDate.getHours() + config.expires)
                      expires = oDate.toUTCString();
                  break;
                  case '天':
                      oDate.setDate(oDate.getDate() + config.expires);
                      expires = oDate.toUTCString();
                  break;
                  case '月':
                      oDate.setMonth(oDate.getMonth() + config.expires);
                      expires = oDate.toUTCString();
                  break;
                  case '年':
                      oDate.setFullYear(oDate.getFullYear() + config.expires);
                      expires = oDate.toUTCString();
                  break;
                  default:
                      oDate.setDate(oDate.getDate() + config.expires);
                      expires = oDate.toUTCString();
                  break;
              }
          }else{
              oDate.setDate(oDate.getDate() + config.expires);
              expires = oDate.toUTCString();
          }
      }else{
          oDate.setDate(oDate.getDate() + 1);
          expires = oDate.toUTCString();
      }
      document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires;
  },
  getCookie(key){//获取cookie
      let str = document.cookie.replace(/;\s*/,';');
      let cookieArr = str.split(';');
      let cookieObj = {};
      let len = cookieArr.length;
      for(let i = 0; i < len;i++){
          let data = cookieArr[i];
          let k = data.split('=')[0];
          let v = data.split('=')[1];
          cookieObj[k] = v;
      }
      if(cookieObj[key]){
          return decodeURIComponent(cookieObj[key]);
      }else{
          return false;
      }
  },
  removeCookie(key){//删除cookie
      document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
