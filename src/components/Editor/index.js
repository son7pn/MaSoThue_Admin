import React  from 'react';
import ReactQuill  from 'react-quill';
import PropTypes from 'prop-types'
import { uploadfile } from 'commons/_api';
import { APP_CONFIG } from 'utils/constants';
import 'react-quill/dist/quill.snow.css';
import { KEY } from '../../modules/Commons/_store/constants';
import ImageResize from 'quill-image-resize-module-react';  // import as default


ReactQuill.Quill.register('modules/imageResize', ImageResize);

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' , readOnly: false };
    this.quillRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.insertTable = this.insertTable.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setQuillRef = element => {
      this.quillRef = element;
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) { 
    if (nextProps.type && nextProps.type === KEY.DETAIL) {
      this.setState({readOnly: true})
    }

    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.value && !this.state.editorHtml  ) {
      this.setState({ editorHtml: nextProps.value });
    }
  }
 
  handleChange(html) {
    this.setState({ editorHtml: html });
    this.handleBlur();
  }
  
  handleBlur() {
    this.props.onChange(this.state.editorHtml);
  }

  imageHandler() {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async function() {
      const file = input.files[0];
      // Save current cursor state
 
      const range = this.quillRef.getEditor().getSelection(true);

      // Insert temporary loading placeholder image
      // this.quillRef.getEditor().insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
      // Move cursor to right side of image (easier to continue typing)
      this.quillRef.getEditor().setSelection(range.index + 1);

      const res = await uploadfile(file); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      this.quillRef.getEditor().deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quillRef.getEditor().insertEmbed(range.index, 'image', APP_CONFIG.appUrl + res.data[0].path);
    }.bind(this);
  }

  insertTable() {
    let module = this.quillRef.getEditor().getModule('better-table')

    module.insertTable(3, 3)
  }
 
  // background: $gray_light
  render() {
    return (
      <>
        <ReactQuill
          readOnly={this.state.readOnly || this.props.disabled}
          style={{opacity: this.props.disabled ? '0.5' : 1, background: this.props.disabled ? '#f6f7f8': 'none'}}
          ref={this.setQuillRef}
          onChange={this.handleChange}
          value={this.state.editorHtml}        
          placeholder={this.props.placeholder}
          theme="snow"
          onBlur={this.handleBlur}
          modules={{

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
                image: this.imageHandler,
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
  }
}

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

export default Editor
