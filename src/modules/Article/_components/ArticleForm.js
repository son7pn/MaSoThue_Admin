import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Select } from 'antd';
import { KEY, STATUS } from 'commons/_store/constants';
import { validationPhone } from 'src/helpers/funcs';
const { Option } = Select
const BannerForm = (props) => {
  const {
    form,
    type,
  } = props;
  return (
    <div>
      <Form form={form} layout="vertical">
        <Row span={24}>
          <Col span={11}>
            <Form.Item
              className="font-weight-bold"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
              label="Tên công ty"
              name="compnayName"
            >
              <Input readOnly={type === KEY.DETAIL}/>
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              className="font-weight-bold"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
              label="Địa chỉ"
              name="address"
            >
              <Input readOnly={type === KEY.DETAIL}/>
            </Form.Item>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={11}>
            <Form.Item
              className="font-weight-bold"
              name="phone"
              label={'Số điện thoại'}
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin' },
                { validator: validationPhone },
              ]}
            >
              <Input readOnly={type === KEY.DETAIL} />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              className="font-weight-bold"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
              label="Vốn điều lệ"
              name="capacity"
            >
              <Input type="number" readOnly={type === KEY.DETAIL}/>
            </Form.Item>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={11}>
            <Form.Item
              className="font-weight-bold"
              name="director"
              label={'Người đại diện'}
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin' }
              ]}
            >
              <Input readOnly={type === KEY.DETAIL} />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              className="font-weight-bold"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
              label="Giới tính"
              name="gender"
            >
              <Input readOnly={type === KEY.DETAIL}/>
            </Form.Item>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={11}>
            <Form.Item
              className="font-weight-bold"
              name="status"
              label={'Tình trạng'}
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin' }
              ]}
            >
              <Select
                placeholder="Chọn trạng thái"
                showSearch
                allowClear
                filterOption={(inputValue, Option) => {
                  if (!Option) return false;
                  return Option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
                }}
              >
                <Option value={STATUS.IS_ACTIVE}>Đang hoạt động</Option>
                <Option value={STATUS.NOT_ACTIVE}>Ngừng hoạt động</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

BannerForm.propTypes = {
  form: PropTypes.any,
  type: PropTypes.string,
};

export default React.memo(BannerForm);
