import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useTranslation } from 'react-i18next';
import * as API from 'article/_api';
// import { KEY } from 'commons/_store/constants';
// import useRouter from 'hooks/useRouter';
import ArticleTable from 'article/_components/ArticleTable';
import { openNotificationWithIcon } from 'helpers/funcs.js';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
// import ActionBar from 'components/ActionBar';
// import { useDispatch } from 'react-redux';
// import { setParams } from 'news/_store/newsSlice';
import ActionSearch from 'components/ActionSearch';
import * as xlsx from 'xlsx/xlsx.mjs';
// import queryString from 'query-string';
// import { NEWS_BUSINESS_AREAS, NEWS_INTRODUCE, NEWS_PRESS_INFORMATION, NEWS_TYPE } from '../../Commons/_store/constants';

const { confirm } = Modal;
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
  const deleteArticle = (id) => {
    confirm({
      title: `B???n c?? ch???c ch???n mu???n x??a ${id} ?`,
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      content: 'Thao t??c n??y kh??ng th??? kh??i ph???c',
      okText: 'X??a',
      cancelText: 'H???y',
      className: 'modal-delete-item',
      onOk() {
        setLoading(true);
        API.deleteArticle(id)
          .then((res) => {
            console.log('ress: ', res);
            if (res && res.success) {
              openNotificationWithIcon('success', 'Thao t??c th??nh c??ng');
              setLoading(false);
              Modal.destroyAll();
              getArticleList({ type: -1, pageIndex: 1})
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

  const readUploadFile = (e) => {
    e.preventDefault();
    // console.log('e.target.files: ', e.target.files);
    if (e.target.files) {
      const name = e.target.files[0].name;
      const typeFile = name.split('.').pop()
      if (typeFile !== 'xlsx') {
        return openNotificationWithIcon('error', 'Import file Excel!');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(JSON.stringify(json));
        console.log(Array.isArray(json));
        if (Array.isArray(json) && json.length > 0) {
          const payload = [];
          json.map((item) => {
            const { tax, phone, address, companyName, createdDate, director, gender, businessType, capacity } = item;
            const itemNew = { tax, phone, address, companyName, createdDate, director, gender, businessType, capacity };
            payload.push(itemNew);
          })
          setLoading(true);
          API.importExcelArticle(JSON.stringify(payload)).then((res) => {
            if (res) {
              getArticleList({ type: -1, pageIndex: 1})
              openNotificationWithIcon('success', 'Thao t??c th??nh c??ng');
              setLoading(false);
            }
          })
            .catch(() => {
              setLoading(false);
            })
            .finnaly(() => {
              setLoading(false);
            });
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* <h2>Qu???n l?? m?? s??? thu??? (C??ng ty, c?? nh??n)</h2> */}
      {/* <ActionBar isBtnAdd handleClickBtn={() => redirectTo} /> */}
      {/* <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
      /> */}
      <div className='display-flex-center justify-content-between full-width'>
        <h2>Qu???n l?? m?? s??? thu??? (C??ng ty, c?? nh??n)</h2>
        <Button type="primary" shape="round" className='position-rel' icon={<UploadOutlined />}>
          Import
          <Input type="file" className='position-abs' id='input-upload-xlsx' name="upload"  onChange={readUploadFile}/>
        </Button>
      </div>
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
        deleteArticle={deleteArticle}
      />
    </div>
  );
};

export default ArticleList;
