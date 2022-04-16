import React, {useEffect} from 'react';
import { Typography } from 'antd';
// import {getClinicList} from '../_api'
import '../_styles/style.scss';
import { useTranslation } from 'react-i18next';

// const ErrorBound = React.lazy(() => import('components/ErrorBound'));

const { Title } = Typography;

// const options = [
//   {name: '1' , value: 1}
// ]
const Dashboard = () => {
  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    // try {
    //   const res = await getClinicList({
    //     id: 1
    //   });
    // } catch (error) {
    // }
  }
  const { t } = useTranslation()
  return (
    <div className="dashboard">
      <Title>{t('common.dashboard')}</Title>
      <i className="icon-shield"></i>
      {/* <FilterBar isSearch  isFilter /> */}
    </div>
  );
};

export default Dashboard;
