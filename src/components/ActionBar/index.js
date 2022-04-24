import React from 'react';
import { Space, Divider, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { KEY } from 'modules/Commons/_store/constants';
import PropTypes from 'prop-types';
// const { Text } = Typography;
const ActionBar = (props) => {
  const { t } = useTranslation();
  const { handleClickBtn, isBtnSave, isBtnClose, loadingBtn, isBtnAdd } = props;
  return (
    <>
      <Divider />
      <div className="d-flex justify-content-end">
        <Space size={40}>
          {isBtnAdd && (
            <Button
              onClick={handleClickBtn(KEY.ADD)}
              className="btn btn-blue"
              loading={loadingBtn}
            >
              {t('common.create')}
            </Button>
          )}
          {isBtnSave && (
            <>
              <Button
                onClick={handleClickBtn(KEY.SAVE)}
                className="btn btn-blue"
                loading={loadingBtn}
              >
                {t('common.save')}
              </Button>
            </>
          )}
          {isBtnClose && (
            <>
              <Button className="btn" onClick={handleClickBtn(KEY.CLOSE)}>
                {t('common.close')}
              </Button>
            </>
          )}
        </Space>
      </div>
    </>
  );
};

ActionBar.propTypes = {
  handleClickBtn: PropTypes.func,
  isBtnSave: PropTypes.bool,
  isBtnClose: PropTypes.bool,
  isBtnAdd: PropTypes.bool,
  loadingBtn: PropTypes.bool,
};
ActionBar.defaultProps = {
  isBtnSave: false,
  isBtnAdd: false,
  isBtnClose: false,
};

export default React.memo(ActionBar);
