import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import * as API from 'comment/_api';
// import { KEY } from 'commons/_store/constants';
// import useRouter from 'hooks/useRouter';
import CommentTable from 'comment/_components/CommentTable';
// import { openNotificationWithIcon } from 'helpers/funcs.js';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { Modal } from 'antd';
// import ActionBar from 'components/ActionBar';
// import { useDispatch } from 'react-redux';
// import { setParams } from 'news/_store/newsSlice';
import ActionSearch from 'components/ActionSearch';
// import queryString from 'query-string';
// import { NEWS_BUSINESS_AREAS, NEWS_INTRODUCE, NEWS_PRESS_INFORMATION, NEWS_TYPE } from '../../Commons/_store/constants';

// const { confirm } = Modal;
const CommentList = () => {
  // const { t } = useTranslation();
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  // const [newsTypeId, setNewsTypeId] = useState();
  // const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [keyWord, setKeyWord] = useState('');
  // const [title, setTitle] = useState('');
  // const params = useSelector((state) => state.news.params);
  // const dispatch = useDispatch();
  useEffect(() => {
    getCommentList()
  }, []);

  const getCommentList = async () => {
    try {
      setLoading(true);
      await API.getAllDataComment({ pageIndex: 1 }).then((res) => {
        // console.log('res: ', res);
        if (res.data.success && res) {
          setListComment(res.data.data.list);
          setLoading(false);
        }
      });
    } catch (err) {
      setListComment([]);
    } finally {
      setLoading(false);
    }
  };
  const onChangeSearch = () => {
    
  };
  const handleSetKeyWord = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      console.log('key ', keyWord);
    }
  };
  // const sortNews = async (id, up) => {
  //   try {
  //     setLoading(true);
  //     await API.sortNews({ newsId: id, Up: up }).then((res) => {
  //       if (res.status === KEY.SUCCESS) {
  //         getCommentList(newsTypeId);
  //         setLoading(false);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const deleteNews = (id) => {
  //   confirm({
  //     title: `${t('common.confirmDeleteWithID')} ${id} ?`,
  //     icon: <ExclamationCircleOutlined />,
  //     okType: 'danger',
  //     content: t('common.descriptionDelete'),
  //     okText: t('common.yes'),
  //     cancelText: t('common.cancel'),
  //     className: 'modal-delete-item',
  //     onOk() {
  //       setLoading(true);
  //       API.deleteNews({ id: id })
  //         .then((res) => {
  //           if (res.status === KEY.SUCCESS) {
  //             openNotificationWithIcon(KEY.SUCCESS, t('common.successMessage'));
  //             setLoading(false);
  //             Modal.destroyAll();
  //           }
  //         })
  //         .catch(() => {
  //           setLoading(false);
  //         })
  //         .finnaly(() => {
  //           setLoading(false);
  //         });
  //     },
  //     onCancel() {},
  //   });
  // };
  return (
    <div>
      <h2>Quản lý bình luận</h2>
      {/* <ActionBar isBtnAdd handleClickBtn={() => redirectTo} /> */}
      <ActionSearch
        style={{ maxWidth: '600px', minWidth: '400px' }}
        placeholder="search"
        value={keyWord}
        onSearch={onChangeSearch}
        onChange={handleSetKeyWord}
      />
      <CommentTable
        data={listComment}
        loading={loading}
      />
    </div>
  );
};

export default CommentList;
