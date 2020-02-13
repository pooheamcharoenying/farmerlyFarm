import dataURLToBlob from './dataURLToBlob'

var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
var IMGUR_API_URL = 'https://api.imgur.com/3/image';

export default function uploadDataURL(dataURL, onprogress) {
  return new Promise((resolve, reject) => {

    var data = new FormData();
    let imageBlob = dataURLToBlob(dataURL)
    data.append('image', imageBlob);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', IMGUR_API_URL, true);
    xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        if (response.status === 200 && response.success) {
          resolve(response.data.link);
        } else {
          var reader = new FileReader();
          reader.onload = function(e) {
            resolve(e.target.result);
          };
          reader.readAsDataURL(imageBlob);
        }
      }
    }
    xhr.send(data);
  

    // let formData = new FormData()
    // let imageBlob = dataURLToBlob(dataURL)
    // formData.append('avatar',imageBlob,
    //   // a random filename
    //   Math.random().toString(36)+'.png')

  //   $.ajax({url:'/api/upload_image',
  //     type:"POST",
  //     data:formData,
  //     cache:false,
  //     contentType:false,
  //     processData:false,

  //     xhr: function(){
  //       // get the native XmlHttpRequest object
  //       var xhr = $.ajaxSettings.xhr() ;
  //       // set the onprogress event handler
        
  //       xhr.upload.onprogress = onprogress || (evt => 
  //         console.log('progress', evt.loaded/evt.total*100)) 

  //       // set the onload event handler
  //       xhr.upload.onload = function(){ console.log('DONE!') } ;
  //       // return the customized object
  //       return xhr ;
  //   }

  //   }).done(response => {
  //     if (response.status == 'success') {
  //       resolve(response.result)
  //     } else {
  //       reject(response.msg||'Some Error Occurred!')
  //     }
  //   }).fail(err => {
  //     reject(err.responseJSON && err.responseJSON.msg 
  //       || err.responseText||'Some Error Occurred!')
  //   })
 })
}