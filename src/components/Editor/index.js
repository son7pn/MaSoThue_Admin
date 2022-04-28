import React, { useState, useEffect, useRef }  from 'react';
import ReactQuill  from 'react-quill';
import PropTypes from 'prop-types'
import { uploadfile } from 'commons/_api';
import { APP_CONFIG } from 'utils/constants';
import 'react-quill/dist/quill.snow.css';
import { KEY } from '../../modules/Commons/_store/constants';
import ImageResize from 'quill-image-resize-module-react';  // import as default
// import QuillBetterTable from 'quill-better-table'

ReactQuill.Quill.register('modules/imageResize', ImageResize);
// ReactQuill.Quill.register(
//   {
//     'modules/better-table': QuillBetterTable
//   },
//   true
// );

const Editor = (props) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  // const [evtToolbar, setEvtToolbar] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    props.type === KEY.DETAIL && setReadOnly(true);
    props.value && !editorHtml && setEditorHtml(props.value)
  }, [props.value]);

  const handleChange = (html) => {
    setEditorHtml(html)
    handleBlur();
  };

  const handleBlur = () => {
    props.onChange(editorHtml)
  };

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async () => {
      const file = input.files[0];
      // Save current cursor state
 
      const range = quillRef.getEditor().getSelection(true);

      // Insert temporary loading placeholder image
      // this.quillRef.getEditor().insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
      // Move cursor to right side of image (easier to continue typing)
      quillRef.getEditor().setSelection(range.index + 1);

      const res = await uploadfile(file); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      quillRef.getEditor().deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      quillRef.getEditor().insertEmbed(range.index, 'image', APP_CONFIG.appUrl + res.data[0].path);
    };
  };

  // const insertTable = () => {
  //   let module = this.quillRef.getEditor().getModule('better-table')

  //   module.insertTable(3, 3)
  // };

  return (
    <>
      <ReactQuill
        readOnly={readOnly || props.disabled}
        style={{opacity: props.disabled ? '0.5' : 1, background: props.disabled ? '#f6f7f8': 'none'}}
        ref={quillRef}
        onChange={handleChange}
        value={editorHtml}
        placeholder={props.placeholder}
        theme="snow"
        onBlur={handleBlur}
        modules={{
          // table: true,  // disable table module
          // 'better-table': {
          //   operationMenu: {
          //     items: {
          //       unmergeCells: {
          //         text: 'Another unmerge cells name'
          //       }
          //     },
          //     color: {
          //       colors: ['#fff', 'red', 'rgb(0, 0, 0)'],  // colors you need in operationMenu, ['white', 'red', 'yellow', 'blue'] as default
          //       text: 'Background Colors'  // subtitle, 'Background Colors' as default
          //     } 
          //   }
          // },
          // keyboard: {
          //   bindings: QuillBetterTable.keyboardBindings
          // },
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
              ['blockquote', 'code-block'],                    // blocks
              [{ 'header': 1 }, { 'header': 2 }],              // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
              [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
              [{ 'direction': 'rtl' }],                        // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
              [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
              [{ 'font': [] }],                                // font family
              [{ 'align': [] }],   
              ['image'],                            // text align
              ['clean'],   
              // ['table']  
            ],
            handlers: {
              image: imageHandler(),
              // table: this.insertTable
            },
          },
          imageResize: {
            handleStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },

        }}
      />
    </>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

Editor.defaultProps = {
  placeholder: 'Nhập vào nội dung',
  type: '',
  disabled: false,
}

export default React.memo(Editor);
