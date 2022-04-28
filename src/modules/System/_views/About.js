import React, { useEffect } from 'react';
import ActionBar from 'components/ActionBar';
import { Form } from 'antd';
import * as API from 'system/_api';
// import { KEY } from 'commons/_store/constants';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import AboutForm from 'system/_components/AboutForm'

const About = () => {
  const [form] = Form.useForm();
  // const [dataDetail, setDataDetail] = useState();

  useEffect(() => {
    getDetailAbout()
  }, [])

  const getDetailAbout = async () => {
    await API.getAllDataAbout().then((res) => {
      if(res && res.data && res.success) {
        // setDataDetail(res.data)
        form.setFieldsValue({
          about: res.data,
        });
      }
    })
  };

  const actionSave = () => {
    // console.log('dataDetail: ', dataDetail);
    form.validateFields().then((values) => {
      values['About'] = values.about;
      const params = {
        configType: '2',
        configKey: 'ABOUTUS',
        configContent: values.about,
        configGroup: 'all',
        configLabel: 'Giới thiệu'
      }
      API.editSystem(params).then((res) => {
        if (res.success) {
          openNotificationWithIcon('success', 'Lưu thành công!');
        }
      })
        .catch(() => {
          openNotificationWithIcon('error',  'Có lỗi khi xử lý');
        })
        .finally();
    });
  };

  return (
    <div>
      <h2>{'Giới thiệu'}</h2>
      <ActionBar isBtnSave handleClickBtn={() => actionSave} />
      <div className='common-box mt-3'>
        <AboutForm
          form={form}
        />
      </div>
    </div>
  )
};

export default About;