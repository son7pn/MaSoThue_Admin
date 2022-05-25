import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import * as API from 'advertisement/_api';
// import { KEY } from 'commons/_store/constants';
import useRouter from 'hooks/useRouter';
import AdvertisementTable from 'advertisement/_components/AdvertisementTable';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import ActionBar from 'components/ActionBar';
// import { useDispatch } from 'react-redux';
// import { setParams } from 'news/_store/newsSlice';
// import ActionSearch from 'components/ActionSearch';
// import queryString from 'query-string';
// import { NEWS_BUSINESS_AREAS, NEWS_INTRODUCE, NEWS_PRESS_INFORMATION, NEWS_TYPE } from '../../Commons/_store/constants';

const { confirm } = Modal;
const AdvertisementList = () => {
  // const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listBanner, setListBanner] = useState([]);
  // const [newsTypeId, setNewsTypeId] = useState();
  // const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  // const [keyWord, setKeyWord] = useState('');
  // const [title, setTitle] = useState('');
  // const params = useSelector((state) => state.news.params);
  // const dispatch = useDispatch();
  useEffect(() => {
    getBannerList()
  }, []);

  const getBannerList = async () => {
    try {
      setLoading(true);
      const params = {
        group: 'ads'
      };
      await API.getAllDataBanner(params).then((res) => {
        // console.log('res: ', res);
        if (res.data.success && res) {
          setListBanner(res.data.data.list);
          setLoading(false);
        }
      });
    } catch (err) {
      setListBanner([]);
    } finally {
      setLoading(false);
    }
  };
  // const onChangeSearch = () => {
    
  // };
  // const handleSetKeyWord = (e) => {
  //   setKeyWord(e.target.value);
  //   if (!e.target.value) {
  //     console.log('key ', keyWord);
  //   }
  // };
  // const sortNews = async (id, up) => {
  //   try {
  //     setLoading(true);
  //     await API.sortNews({ newsId: id, Up: up }).then((res) => {
  //       if (res.status === KEY.SUCCESS) {
  //         getBannerList(newsTypeId);
  //         setLoading(false);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const deleteBanner = (id) => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${id} ?`,
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      content: 'Thao tác này không thể khôi phục',
      okText: 'Xóa',
      cancelText: 'Hủy',
      className: 'modal-delete-item',
      onOk() {
        setLoading(true);
        API.deleteBanner(id)
          .then((res) => {
            console.log('ress: ', res);
            if (res && res.success) {
              openNotificationWithIcon('success', 'Thao tác thành công');
              setLoading(false);
              Modal.destroyAll();
              getBannerList()
            }
          })
          .catch(() => {
            setLoading(false);
          })
          .finnaly(() => {
            setLoading(false);
          });
      },
      onCancel() {},
    });
  };
  const redirectTo = () => {
    // let _params = {
    //   newsTypeId: newsTypeId
    // }
    // const paramStr = queryString.stringify(_params)
    router.push({
      pathname: '/advertisement/add'
    });
  };
  return (
    <div>
      <h2>Advertisement</h2>
      <ActionBar isBtnAdd handleClickBtn={() => redirectTo} />
      {/* <ActionSearch
        style={{ maxWidth: '600px', minWidth: '400px' }}
        placeholder={`${t('common.search')}`}
        value={keyWord}
        onSearch={onChangeSearch}
        onChange={handleSetKeyWord}
      /> */}
      <AdvertisementTable
        data={listBanner}
        loading={loading}
        deleteBanner={deleteBanner}
      />
    </div>
  );
};

export default AdvertisementList;
