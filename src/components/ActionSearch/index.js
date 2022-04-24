import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
const { Search } = Input;
const ActionSearch = (props) => {
  //Hook init
  const { t } = useTranslation();
  const { spaceLeft, placeholder, value, onSearch, onChange } = props;

  return (
    <div className="filter-bar d-flex" style={{ paddingLeft: spaceLeft }}>
      <div
        style={{ width: '-webkit-fill-available' }}
        className="filter-bar d-flex "
      >
        <Search
          style={{ maxWidth: '600px', minWidth: '400px' }}
          placeholder={placeholder || `${t('common.search')}`}
          value={value}
          onSearch={onSearch}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

ActionSearch.propTypes = {
  placeholder: PropTypes.string,
  spaceLeft: PropTypes.number,
  value: PropTypes.any,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
};
ActionSearch.defaultProps = {
  placeholder: '',
  spaceLeft: 0,
  onSearch: () => {},
};

export default React.memo(ActionSearch);
