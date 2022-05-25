import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import * as API from 'crawl/_api';
// import { KEY } from 'commons/_store/constants';
// import useRouter from 'hooks/useRouter';
import CrawlTable from 'crawl/_components/CrawlTable';
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
const CrawlList = () => {
  // const { t } = useTranslation();
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listCrawl, setListCrawl] = useState([]);
  // const [newsTypeId, setNewsTypeId] = useState();
  const [pagination, setPagination] = useState({});
  const [keyWord, setKeyWord] = useState('');
  // const [title, setTitle] = useState('');
  // const params = useSelector((state) => state.news.params);
  // const dispatch = useDispatch();
  useEffect(() => {
    getCrawlList({ keyword: '', pageIndex: 1})
  }, []);

  const getCrawlList = async ({ keyword, pageIndex }) => {
    try {
      setLoading(true);
      await API.getAllDataCrawl({ keyword: keyword, pageIndex: Number(pageIndex) ? pageIndex : 1 }).then((res) => {
        if (res.data.success && res) {

          setListCrawl(res.data.data.list);
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
      setListCrawl([]);
    } finally {
      setLoading(false);
    }
  };
  const onChangeSearch = (pageIndex) => {
    console.log();
    getCrawlList({ keyword: keyWord, pageIndex: pageIndex})
  };
  const handleSetKeyWord = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      getCrawlList({ keyword: '', pageIndex: 1})
    }
  };
  const handleChangePage = (page) => {
    if (keyWord) {
      onChangeSearch(page)
    } else {
      getCrawlList({ keyword: '', pageIndex: page})
    }
  };
  const handleSelectedRowKeys = (data) => {
    console.log('data: ', data);
  };
  // const actionSave  = () => {
  //   console.log('submit');
  // }
  return (
    <div>
      <h2>Quản lý danh sách Crawl</h2>
      {/* <ActionBar isBtnSave handleClickBtn={() => actionSave} /> */}
      <ActionSearch
        style={{ maxWidth: '600px', minWidth: '400px' }}
        placeholder="search"
        value={keyWord}
        onSearch={onChangeSearch}
        onChange={handleSetKeyWord}
      />
      <CrawlTable
        data={listCrawl}
        loading={loading}
        pagination={pagination}
        handleChangePage={handleChangePage}
        handleSelectedRowKeys={handleSelectedRowKeys}
      />
    </div>
  );
};

export default CrawlList;
