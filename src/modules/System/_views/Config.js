import React, { useEffect, useState } from 'react';
import ActionBar from 'components/ActionBar';
import { Form } from 'antd';
import * as API from 'system/_api';
// import { KEY } from 'commons/_store/constants';
import { beforeUpload, getUrlImage } from 'helpers/funcs.js';
import { uploadfile } from 'commons/_api';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import ConfigForm from 'system/_components/ConfigForm'

const Config = () => {
  const [form] = Form.useForm();
  const [imageUrlLogo, setImageUrlLogo] = useState('');
  const [dataDetail, setDataDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetailConfig()
  }, [])

  const getDetailConfig = async () => {
    await API.getAllDataSystem().then((res) => {
      if(res && res.data && res.success) {
        setDataDetail(res.data)
        setImageUrlLogo(res.data[2].configContent)
        form.setFieldsValue({
          email: res.data[0].configContent,
          hotline: res.data[1].configContent,
          policy: res.data[3].configContent,
          terms: res.data[4].configContent,
        });
      }
    })
  };

  const actionSave = () => {
    console.log('dataDetail: ', dataDetail);
    form.validateFields().then((values) => {
      values['Hotline'] = values.hotline;
      values['Email'] = values.email;
      values['Policy'] = values.policy;
      values['Terms'] = values.terms;
      values['ImageUrl'] = imageUrlLogo;
      // console.log('values: ', values);
      const params = [
        {
          configType: '1',
          configKey: 'EMAIL',
          configContent: values.email,
          configGroup: 'all',
          configLabel: 'Email liên hệ'
        },
        {
          configType: '1',
          configKey: 'HOTLINE',
          configContent: values.hotline,
          configGroup: 'all',
          configLabel: 'Hotline'
        },
        {
          configType: '2',
          configKey: 'POLICY',
          configContent: values.policy,
          configGroup: 'all',
          configLabel: 'Chính sách bảo mật'
        },
        {
          configType: '2',
          configKey: 'TERMS',
          configContent: values.terms,
          configGroup: 'all',
          configLabel: 'Điều khoản sử dụng'
        },
        {
          configType: '3',
          configKey: 'LOGO',
          configContent: imageUrlLogo,
          configGroup: 'all',
          configLabel: 'Logo công ty'
        }
      ];
      params.map((item) => {
        API.editSystem(item).then((res) => {
          if (res.success) {
            openNotificationWithIcon('success', 'Lưu thành công!');
          }
        })
          .catch(() => {
            openNotificationWithIcon('error',  'Có lỗi khi xử lý');
          })
          .finally();
      })
    });
  };
  const handleChangeLogo = async (evt) => {
    const { onSuccess, onError, file } = evt;
    let validate = false;

    validate = await beforeUpload(file);

    if (validate) {
      setLoading(true);
      uploadfile(evt.file)
        .then((res) => {
          if (res && res.success && res.data) {
            onSuccess('Ok');
            setImageUrlLogo(res.data[0].path);
          }
        })
        .catch((err) => {
          onError({ err });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <h2>{'Cài đặt hệ thống'}</h2>
      <ActionBar isBtnSave handleClickBtn={() => actionSave} />
      <div className='common-box mt-3'>
        <ConfigForm
          form={form}
          loading={loading}
          handleChangeLogo={handleChangeLogo}
          getUrlImage={getUrlImage}
          imageUrlLogo={imageUrlLogo}
        />
      </div>
    </div>
  )
};

export default Config;