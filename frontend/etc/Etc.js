// var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
// var IMGUR_API_URL = 'https://api.imgur.com/3/image';

// function imageHandler(image, callback) {
//   var data = new FormData();
//   data.append('image', image);

//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', IMGUR_API_URL, true);
//   xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4) {
//       var response = JSON.parse(xhr.responseText);
//       if (response.status === 200 && response.success) {
//         callback(response.data.link);
//       } else {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//           callback(e.target.result);
//         };
//         reader.readAsDataURL(image);
//       }
//     }
//   }
//   xhr.send(data);
// }

// var quill = new Quill('#editor-container', {
//   modules: {
//     toolbar: [
//       'image'
//     ]
//   },
//   placeholder: 'Insert an image...',
//   theme: 'snow',
//   imageHandler: imageHandler
// });

// <div id="editor-container"></div>

// #editor-container {
//     height: 375px;
//   }

//https://github.com/quilljs/quill/issues/1089

//https://github.com/quilljs/quill/pull/995

