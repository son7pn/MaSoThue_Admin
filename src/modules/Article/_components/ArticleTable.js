import React from 'react';
import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
// import useRouter from 'hooks/useRouter';
const { Column } = Table;
const { Text } = Typography;
const ArticleTable = (props) => {
  const { loading, data, handleChangePage, pagination, deleteArticle } = props;
  // const router = useRouter();
  return (
    <div>
      <Table
        pagination={{
          size: 'small',
          total: pagination.totalRecords,
          position: ['bottomCenter'],
          current: pagination.pageIndex,
          showSizeChanger: true,
          onChange: (page) => handleChangePage(page),
        }}
        loading={loading}
        rowKey={(record) => record.id}
        dataSource={data}
      >
        <Column 
          title="STT"
          key="id"
          render={(text, record, index) => (
            <>
              <Text><Link to={'/article'}>{index + 1}</Link></Text>
            </>
          )}
        />
        <Column 
          title="Tax"
          key="tax"
          render={(record) => (
            <>
              <Text><Link to={'/article'}>{ record.tax }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Tên công ty"
          key="compnayName"
          render={(record) => (
            <>
              <Text><Link to={'/article'}>{ record.compnayName }</Link></Text>
            </>
          )}
        />
        {/* <Column 
          title="Content"
          key="thumb"
          render={(record) => (
            <>
              <Text><Link to={'/comment/detail?id='+ record.id}>{ record.thumb }</Link></Text>
            </>
          )}
        /> */}
        <Column
          title="Tùy chọn"
          key="title"
          render={(record) => (
            <>
              <Link
                className="mr-2 cusor-pointer"
                to={'/article/edit?id=' + record.id}
              >
                <EditOutlined />
              </Link>
              <DeleteOutlined
                className="mr-2 cusor-pointer text-red-delete"
                onClick={() => deleteArticle(record.id)}
              />
            </>
          )}
        />
      </Table>
    </div>
  );
};
ArticleTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  sortNews: PropTypes.func,
  deleteArticle: PropTypes.func,
  pagination: PropTypes.any,
  handleChangePage: PropTypes.func,
  addChild: PropTypes.func,
  newsTypeId: PropTypes.number
}
export default ArticleTable;
