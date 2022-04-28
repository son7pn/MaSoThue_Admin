import React from 'react';
import { Form} from 'antd';
import PropTypes from 'prop-types';
import { KEY } from 'commons/_store/constants';
import Editor from 'components/Editor';

const AboutForm = (props) => {
  const {
    form,
    type,
  } =
    props;
  
  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Giới thiệu"
          name="about"
        >
          <Editor disabled={type === KEY.DETAIL} />
        </Form.Item>
      </Form>
    </div>
  )
};

AboutForm.propTypes = {
  form: PropTypes.any,
  type: PropTypes.string,
};

export default React.memo(AboutForm);