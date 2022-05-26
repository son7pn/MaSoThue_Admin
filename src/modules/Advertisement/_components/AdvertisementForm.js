import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useRouter from 'hooks/useRouter';
import { Form, Input, Row, Col, Upload, Image, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { KEY, NO_IMAGE } from 'commons/_store/constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AdvertisementForm = (props) => {
  const {
    form,
    loading,
    getUrlImage,
    imageUrlBanner,
    handleChangeImageBanner,
    typePage,
  } = props;
  const { t } = useTranslation();
  const [typeAds, setTypeAds] = useState(1);
  const router = useRouter();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="upload" style={{ marginTop: 8 }}>
        {t('common.uploadImage')}
      </div>
    </div>
  );
  useEffect (() => {
    if (router.pathname.includes(KEY.EDIT)) {
      setTimeout(() => {
        setTypeAds(form.getFieldValue('type'));
        console.log('form: ', form.getFieldValue('type'));
      }, 300)
    }
  }, []);


  const listPositionType = [
    {
      id: 1,
      value: 'Hiển thị header',
    },
    {
      id: 2,
      value: 'Hiển thị cột phải trên',
    },
    {
      id: 3,
      value: 'Hiển thị cuối danh sách bài viết',
    }
  ];
  const listType = [
    {
      id: 1,
      value: 'Ảnh',
    },
    {
      id: 2,
      value: 'Code',
    }
  ];

  const changeTypeAds = (val) => {
    console.log('valll: ', val);
    setTypeAds(val)
  }

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Name"
          name="name"
        >
          <Input readOnly={typePage === KEY.DETAIL}/>
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Url"
          name="url"
        >
          <Input readOnly={typePage === KEY.DETAIL}/>
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Position"
          name="position"
        >
          <Select
            allowClear
            optionFilterProp="children"
            showSearch
            filterOption={(inputValue, Option) => {
              if (!Option) return false;
              return Option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
            }}
          >
            {listPositionType?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="font-weight-bold"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
          label="Type"
          name="type"
        >
          <Select
            allowClear
            optionFilterProp="children"
            showSearch
            onChange={changeTypeAds}
            filterOption={(inputValue, Option) => {
              if (!Option) return false;
              return Option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
            }}
          >
            {listType?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {typeAds === 2 && (
          <Form.Item
            className="font-weight-bold"
            rules={[{ required: false, message: 'Vui lòng nhập thông tin' }]}
            label="Code"
            name="content"
          >
            <Input readOnly={typePage === KEY.DETAIL}/>
          </Form.Item>
        )}
        {typeAds === 1 && (
          <Row span={24}>
            <Col span={12}>
              <Form.Item
                className="font-weight-bold"
                label="Ảnh Banner"
                name="urlImage"
              >
                <Upload
                  disabled={typePage === KEY.DETAIL}
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
        )}
      </Form>
    </div>
  );
};

AdvertisementForm.propTypes = {
  form: PropTypes.any,
  lang: PropTypes.string,
  loading: PropTypes.bool,
  getUrlImage: PropTypes.func,
  imageUrlBanner: PropTypes.string,
  handleChangeImageBanner: PropTypes.func,
  typePage: PropTypes.string,
};

export default React.memo(AdvertisementForm);
