import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Upload, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { KEY, NO_IMAGE } from 'commons/_store/constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const BannerForm = (props) => {
  const {
    form,
    loading,
    getUrlImage,
    imageUrlBanner,
    handleChangeImageBanner,
    type,
  } = props;
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
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Name"
          name="name"
        >
          <Input readOnly={type === KEY.DETAIL}/>
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Contnet"
          name="content"
        >
          <Input readOnly={type === KEY.DETAIL}/>
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Url"
          name="url"
        >
          <Input readOnly={type === KEY.DETAIL}/>
        </Form.Item>
        <Row span={24}>
          <Col span={12}>
            <Form.Item
              className="font-weight-bold"
              label="Ảnh Banner"
              name="urlImage"
            >
              <Upload
                disabled={type === KEY.DETAIL}
                name="url"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={handleChangeImageBanner}
              >
                {imageUrlBanner && imageUrlBanner !== '' ? (
                  <Image
                    fallback={NO_IMAGE}
                    preview={false}
                    src={getUrlImage(imageUrlBanner)}
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
  );
};

BannerForm.propTypes = {
  form: PropTypes.any,
  lang: PropTypes.string,
  loading: PropTypes.bool,
  getUrlImage: PropTypes.func,
  imageUrlBanner: PropTypes.string,
  handleChangeImageBanner: PropTypes.func,
  type: PropTypes.string,
};

export default React.memo(BannerForm);
