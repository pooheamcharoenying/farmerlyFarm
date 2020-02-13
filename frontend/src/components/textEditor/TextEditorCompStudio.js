// import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import uploadDataURL from './functions/uploadDataURL'
// class UploadAdapter {
//     constructor( loader ) {
//         // Save Loader instance to update upload progress.
//         this.loader = loader;
//         console.log(loader);
//     }

//     upload() {
//         let { loader } = this;
//         // Update loader's progress.
//         // server.onUploadProgress( data => {
//         //     loader.uploadTotal = data.total;
//         //     loader.uploaded = data.uploaded;
//         // } ):

//         // loader.uploadTotal
//         let dataURL = loader._reader._reader.result
//         console.log(dataURL)
        
//         // let count = 1;
        
//         // let interval = setInterval(() => {
//         //     if (count > 4)
//         //         clearInterval(interval)
//         //     loader.uploadTotal = 1024;
//         //     loader.uploaded = (1024/5)*count;
//         //     count++;

//         // }, 1000)

//         // Return promise that will be resolved when file is uploaded.
//         return new Promise((resolve, reject) => {

//             uploadDataURL(dataURL, 
//               // onprogress event handler
//               event => {
//                 loader.uploadTotal = event.total;
//                 loader.uploaded = event.loaded
//             }).then(result => {
//                 resolve({default:result})
//               }).catch(err => {
//                 reject(err)
//               })
//         })
//     }

//     abort() {
//         // Reject promise returned from upload() method.

//     }
// }


// class TextEditorComp extends Component {
//     render() {
//         return (
//             <div className="App">
            
//                 <CKEditor
                
//                     editor={ ClassicEditor }
//                     data={this.props.dataIn}
                  
//                     onInit={editor => {
//                         editor.plugins.get('FileRepository')
//                           .createUploadAdapter = loader => new UploadAdapter(loader);
                      
//                       }}
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
//                         this.props.dataOut(data)
//                     } }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }

//                     config={ {

                       
                        
//                         image: {
//                         // You need to configure the image toolbar, too, so it uses the new style buttons.
//                         toolbar: [ 'imageTextAlternative', '|', 
//                           'imageStyle:full', 
//                           'imageStyle:alignLeft', 
//                           'imageStyle:alignCenter', 
//                           'imageStyle:alignRight', 
//                            'imageStyle:side'
//                           ],
//                         }

//                     }}
//                 />
//             </div>
//         );
//     }
// }

// export default TextEditorComp;