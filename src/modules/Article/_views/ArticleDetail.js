import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import ArticleForm from 'article/_components/ArticleForm';
import { KEY } from 'commons/_store/constants';
import useRouter from 'hooks/useRouter';
import ActionBar from 'components/ActionBar';
import * as API from 'article/_api';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import { useTranslation } from 'react-i18next';

const ArticleDetail = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [dataDetail, setDataDetail] = useState();

  useEffect(() => {
    if (router.pathname.includes(KEY.ADD)) {
      setTitle('Thêm mới');
      setType(KEY.ADD);
    } else if (router.pathname.includes(KEY.EDIT)) {
      setTitle('Chỉnh sửa bài viết');
      setType(KEY.EDIT);
      getDetailArticle(router.query.id);
    } else if (router.pathname.includes(KEY.DETAIL)) {
      setTitle('Chi tiết');
      setType(KEY.DETAIL);
      getDetailArticle(router.query.id);
    }
  }, [router]);
  
  const actionItemArticle = () => {
    switch (type) {
    case KEY.ADD: {
      form.validateFields().then((values) => {
        values['Id'] = 0;
        values['Name'] = values.name || '';
        values['position'] = 0;
        values['type'] = 0;
        values['isEnable'] = true;
        values['Thumb'] = values.thumb || '';
        API.createBanner(values)
          .then((res) => {
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
        console.log('values: ', values);
        const {
          compnayName,
          address,
          phone,
          capacity,
          director,
          gender,
          status
        } = values;
        const payload = {
          id: Number(dataDetail.id),
          compnayName,
          address,
          phone,
          capacity: Number(capacity),
          director,
          gender,
          status
        }
        API.editArticle(payload)
          .then((res) => {
            if (res.success) {
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
    router.push('/article')
  };

  const getDetailArticle = (id) => {
    API.getDetailArticle(id)
      .then((res) => {
        setDataDetail(res.data);
        console.log('res data: ', res.data);
        form.setFieldsValue({
          compnayName: res.data.compnayName,
          address: res.data.address,
          phone: res.data.phone,
          capacity: res.data.capacity,
          director: res.data.director,
          gender: res.data.gender,
          status: res.data.status,
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
        <ActionBar isBtnSave={true} handleClickBtn={() => actionItemArticle} />
      )}
      <div className="common-box mt-3">
        <ArticleForm
          form={form}
          type={type}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
