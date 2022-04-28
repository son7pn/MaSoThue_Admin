import React from 'react';
import { Form, Input, Row, Col, Upload, Image } from 'antd';
import PropTypes from 'prop-types';
import { KEY, NO_IMAGE } from 'commons/_store/constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { validationPhone, validationEmail } from 'src/helpers/funcs';
import Editor from 'components/Editor';
import { useTranslation } from 'react-i18next';

const ConfigForm = (props) => {
  const {
    form,
    type,
    loading,
    getUrlImage,
    handleChangeLogo,
    imageUrlLogo,
  } =
    props;
  const { t } = useTranslation();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="upload" style={{ marginTop: 8 }}>
        {t('common.uploadImage')}
      </div>
    </div>
  );
  return (
    <div>
      <Form form={form} layout="vertical">
        <Row span={24}>
          <Col span={10}>
            <Form.Item
              className="font-weight-bold"
              name="email"
              label={'Email'}
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin' },
                { validator: validationEmail },
              ]}
            >
              <Input readOnly={type === KEY.DETAIL} />
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item
              className="font-weight-bold"
              name="hotline"
              label={'Số điện thoại'}
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin' },
                { validator: validationPhone },
              ]}
            >
              <Input readOnly={type === KEY.DETAIL} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Chính sách bảo mật"
          name="policy"
        >
          <Editor disabled={type === KEY.DETAIL} />
          {/* <TextArea rows={8} readOnly={type === KEY.DETAIL}/> */}
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Điều khoản sử dụng"
          name="terms"
        >
          <Editor disabled={type === KEY.DETAIL} />
          {/* <TextArea rows={8} readOnly={type === KEY.DETAIL}/> */}
        </Form.Item>
        <Row span={24}>
          <Col span={12}>
            <Form.Item
              className="font-weight-bold"
              label="Ảnh Logo"
              name="ImageUrl"
            >
              <Upload
                disabled={type === KEY.DETAIL}
                name="ImageUrl"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={handleChangeLogo}
              >
                {imageUrlLogo && imageUrlLogo !== '' ? (
                  <Image
                    fallback={NO_IMAGE}
                    preview={false}
                    src={getUrlImage(imageUrlLogo)}
                    alt="ImageUrl"
                    width={104}
                    height={104}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
};

ConfigForm.propTypes = {
  form: PropTypes.any,
  lang: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  getUrlImage: PropTypes.func,
  imageUrlLogo: PropTypes.string,
  handleChangeLogo: PropTypes.func,
};

export default React.memo(ConfigForm);