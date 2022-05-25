import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import AdvertisementForm from 'advertisement/_components/AdvertisementForm';
import { KEY } from 'commons/_store/constants';
import useRouter from 'hooks/useRouter';
import { beforeUpload, getUrlImage } from 'helpers/funcs.js';
import { uploadfile } from 'commons/_api';
import ActionBar from 'components/ActionBar';
import * as API from 'advertisement/_api';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import { useTranslation } from 'react-i18next';

const AdvertisementDetail = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [imageUrlBanner, setImageUrlBanner] = useState('');
  const [dataDetail, setDataDetail] = useState();

  useEffect(() => {
    if (router.pathname.includes(KEY.ADD)) {
      setTitle('Thêm mới');
      setType(KEY.ADD);
    } else if (router.pathname.includes(KEY.EDIT)) {
      setTitle('Sửa');
      setType(KEY.EDIT);
      getDetailBaner(router.query.id);
    } else if (router.pathname.includes(KEY.DETAIL)) {
      setTitle('Chi tiết');
      setType(KEY.DETAIL);
      getDetailBaner(router.query.id);
    }
  }, [router]);

  const handleChangeImageBanner = async (evt) => {
    const { onSuccess, onError, file } = evt;
    let validate = false;

    validate = await beforeUpload(file);

    if (validate) {
      setLoading(true);
      uploadfile(evt.file)
        .then((res) => {
          if (res && res.success && res.data) {
            onSuccess('Ok');
            setImageUrlBanner(res.data[0].path);
          }
        })
        .catch((err) => {
          onError({ err });
        })
        .finally(() => setLoading(false));
    }
  };
  const actionItemBanner = () => {
    switch (type) {
    case KEY.ADD: {
      form.validateFields().then((values) => {
        console.log('value: ', values);
        values['Id'] = 0;
        values['Name'] = values.name || '';
        values['position'] = values.position || null;
        values['type'] = values.type || null;
        values['group'] = 'ads';
        values['url'] = values.url || '';
        values['content'] = values.content || '';
        values['isEnable'] = true;
        values['thumb'] = imageUrlBanner;
        API.createBanner(values)
          .then((res) => {
            console.log('res create: ', res);
            if (res && res.success) {
              openNotificationWithIcon('success', t('common.successMessage'));
              redirectBack()
            }
          })
          .catch(() => {
            openNotificationWithIcon('error', t('common.errorMessage'));
          })
          .finally();
      });
      break;
    }
    case KEY.EDIT: {
      form.validateFields().then((values) => {
        values['Id'] = dataDetail.id;
        values['Name'] = values.name || '';
        values['position'] = values.position || null;
        values['type'] = values.type || null;
        values['group'] = 'ads';
        values['url'] = values.url || '';
        values['content'] = values.content || '';
        values['isEnable'] = true;
        values['thumb'] = imageUrlBanner;
        API.editBanner(values)
          .then((res) => {
            if (res.status === KEY.SUCCESS) {
              openNotificationWithIcon('success', t('common.successMessage'));
              redirectBack()
            }
          })
          .catch(() => {
            openNotificationWithIcon('error', t('common.errorMessage'));
          })
          .finally();
      });
      break;
    }
    }
  };
  
  const redirectBack = () => {
    router.push('/advertisement')
  };

  const getDetailBaner = (id) => {
    API.getDetailBaner(id)
      .then((res) => {
        setImageUrlBanner(res.data?.thumb);
        setDataDetail(res.data);
        form.setFieldsValue({
          name: res.data.name,
          url: res.data.url,
          content: res.data.content,
          type: res.data.type,
          position: res.data.position,
        });
      })
      .catch(() => {
        openNotificationWithIcon('error', t('common.errorMessage'));
      })
      .finally();
  };

  return (
    <div>
      <h2>{title}</h2>
      { (type === KEY.ADD || type === KEY.EDIT) && (
        <ActionBar isBtnSave={true} handleClickBtn={() => actionItemBanner} />
      )}
      <div className="common-box mt-3">
        <AdvertisementForm
          form={form}
          loading={loading}
          handleChangeImageBanner={handleChangeImageBanner}
          getUrlImage={getUrlImage}
          imageUrlBanner={imageUrlBanner}
          typePage={type}
        />
      </div>
    </div>
  );
};

export default AdvertisementDetail;
