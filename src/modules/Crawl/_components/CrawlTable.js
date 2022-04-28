import React from 'react';
import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
// import {
//   EditOutlined,
// } from '@ant-design/icons';
// import useRouter from 'hooks/useRouter';
const { Column } = Table;
const { Text } = Typography;
const CrawlTable = (props) => {
  const { loading, data, handleChangePage, pagination, handleSelectedRowKeys } = props;
  const rowSelection = {
    onChange: (selectedRowKeys) => handleSelectedRowKeys(selectedRowKeys)
  };
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
        rowSelection={rowSelection}
        loading={loading}
        rowKey={(record) => record.id}
        dataSource={data}
      >
        <Column 
          title="STT"
          key="id"
          render={(text, record, index) => (
            <>
              <Text><Link to={'/crawl'}>{index + 1}</Link></Text>
            </>
          )}
        />
        <Column 
          title="Tax"
          key="tax"
          render={(record) => (
            <>
              <Text><Link to={'/crawl'}>{ record.tax }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Tên công ty"
          key="compnayName"
          render={(record) => (
            <>
              <Text><Link to={'/crawl'}>{ record.compnayName }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Ngày tạo"
          key="createdDate"
          render={(record) => (
            <>
              <Text><Link to={'/crawl'}>{ moment(record.createdDate).format('DD/MM/YYYY HH:mm') }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Thành phố"
          key="province"
          render={(record) => (
            <>
              <Text><Link to={'/crawl'}>{ record.province }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Trạng thái chuyển đổi"
          key="syncStatus"
          render={(record) => (
            <>
              <Text><Link to={'/crawl'}>{ record.syncStatus ? 'Thành công' : 'Chưa chuyển đổi' }</Link></Text>
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
        {/* <Column
          title="Tùy chọn"
          key="title"
          render={(record) => (
            <>
              <Link
                className="mr-2 cusor-pointer"
                to={'/crawl/edit?id=' + record.id}
              >
                <EditOutlined />
              </Link>
              <DeleteOutlined
                className="mr-2 cusor-pointer text-red-delete"
                onClick={() => deleteBanner(record.id)}
              />
            </>
          )}
        /> */}
      </Table>
    </div>
  );
};
CrawlTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  sortNews: PropTypes.func,
  deleteBanner: PropTypes.func,
  pagination: PropTypes.any,
  handleChangePage: PropTypes.func,
  addChild: PropTypes.func,
  newsTypeId: PropTypes.number,
  handleSelectedRowKeys: PropTypes.func,
}
export default CrawlTable;
