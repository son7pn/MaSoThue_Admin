import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import * as API from 'article/_api';
// import { KEY } from 'commons/_store/constants';
// import useRouter from 'hooks/useRouter';
import ArticleTable from 'article/_components/ArticleTable';
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
const ArticleList = () => {
  // const { t } = useTranslation();
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  // const [newsTypeId, setNewsTypeId] = useState();
  const [pagination, setPagination] = useState({});
  const [keyWord, setKeyWord] = useState('');
  // const [title, setTitle] = useState('');
  // const params = useSelector((state) => state.news.params);
  // const dispatch = useDispatch();
  useEffect(() => {
    getArticleList({ type: -1, pageIndex: 1})
  }, []);

  const getArticleList = async ({ type, pageIndex }) => {
    try {
      setLoading(true);
      await API.getAllDataArticle({ type: type, pageIndex: pageIndex }).then((res) => {
        if (res.data.success && res) {
          setListArticle(res.data.data.list);
          setPagination({
            ...pagination,
            totalPage: (Math.floor(res.data.data.totalRow/10) + (res.data.data.totalRow % 10 == 0 ? 0 : 1 )),
            pageSize: 10,
            pageIndex: pageIndex,
            totalRecords: res.data.data.totalRow,
          })
          setLoading(false);
        }
      });
    } catch (err) {
      setListArticle([]);
    } finally {
      setLoading(false);
    }
  };
  const onChangeSearch = async (pageIndex) => {
    try {
      setLoading(true);
      await API.getSearchArticle({ keyword: keyWord, pageIndex: Number(pageIndex) ? pageIndex : 1 }).then((res) => {
        if (res.data.success && res) {
          setListArticle(res.data.data.list);
          setPagination({
            ...pagination,
            totalPage: (Math.floor(res.data.data.totalRow/10) + (res.data.data.totalRow % 10 == 0 ? 0 : 1 )),
            pageSize: 10,
            pageIndex:  Number(pageIndex) ? pageIndex : 1,
            totalRecords: res.data.data.totalRow,
          })
          setLoading(false);
        }
      });
    } catch (err) {
      setListArticle([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSetKeyWord = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      getArticleList({ type: -1, pageIndex: 1})
    }
  };
  const handleChangePage = (page) => {
    if (keyWord) {
      onChangeSearch(page)
    } else {
      getArticleList({ type: -1, pageIndex: page})
    }
  };
  return (
    <div>
      <h2>Quản lý mã số thuế (Công ty, cá nhân)</h2>
      {/* <ActionBar isBtnAdd handleClickBtn={() => redirectTo} /> */}
      <ActionSearch
        style={{ maxWidth: '600px', minWidth: '400px' }}
        placeholder="search"
        value={keyWord}
        onSearch={onChangeSearch}
        onChange={handleSetKeyWord}
      />
      <ArticleTable
        data={listArticle}
        loading={loading}
        pagination={pagination}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default ArticleList;
