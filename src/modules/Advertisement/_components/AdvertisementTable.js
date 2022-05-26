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
const AdvertisementTable = (props) => {
  const { loading, data, deleteBanner } = props;
  // const router = useRouter();
  return (
    <div>
      <Table
        loading={loading}
        rowKey={(record) => record.id}
        dataSource={data}
      >
        <Column 
          title="STT"
          key="id"
          render={(text, record, index) => (
            <>
              <Text><Link to={'/advertisement/detail?id='+ record.id}>{index + 1}</Link></Text>
            </>
          )}
        />
        <Column 
          title="Name"
          key="name"
          render={(record) => (
            <>
              <Text><Link to={'/advertisement/detail?id='+ record.id}>{ record.name }</Link></Text>
            </>
          )}
        />
        <Column 
          title="Content"
          key="content"
          render={(record) => (
            <>
              <Text><Link to={'/advertisement/detail?id='+ record.id}>{ record.content }</Link></Text>
            </>
          )}
        />
        <Column
          title="Tùy chọn"
          key="title"
          render={(record) => (
            <>
              <Link
                className="mr-2 cusor-pointer"
                to={'/advertisement/edit?id=' + record.id}
              >
                <EditOutlined />
              </Link>
              <DeleteOutlined
                className="mr-2 cusor-pointer text-red-delete"
                onClick={() => deleteBanner(record.id)}
              />
            </>
          )}
        />
      </Table>
    </div>
  );
};
AdvertisementTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  sortNews: PropTypes.func,
  deleteBanner: PropTypes.func,
  pagination: PropTypes.any,
  handleChangePage: PropTypes.func,
  addChild: PropTypes.func,
  newsTypeId: PropTypes.number
}
export default AdvertisementTable;
