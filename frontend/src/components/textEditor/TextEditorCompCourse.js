// import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// class TextEditorComp extends Component {
//     render() {
//         return (
//             <div className="w-full">
            
//                 <CKEditor
//                  disabled 
//                     editor={ ClassicEditor }
//                     data={this.props.dataIn}
                  
//                     onInit={editor => {
                    
//                       }}
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
                     
//                     } }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }

//                     config={ {

//                         toolbar: [ ],
                    

//                     }}
//                 />
//             </div>
//         );
//     }
// }

// export default TextEditorComp;