import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DatePicker, Select, Space } from 'antd';
import { changeSearchDateType, changeSearchDate } from '../../redux/actions/headers/headers.actionCreators';

const { Option } = Select;

const PickerWithType = ({ type, onChange, defaultData }) =>{
  return <DatePicker style={{height: 40}} defaultValue={defaultData} picker={type} onChange={onChange} />;
}


const SwitchablePicker = ()=> {
  const [type] = useState('month');
  const dispatch = useDispatch();


  let search = window.location.search;
  let params = new URLSearchParams(search);
  let reportDate = params.get('reportDate') || '';
  const defaultDataValue = reportDate ? moment(reportDate) : moment();

  const onDateSelect = (value) => {
    dispatch(changeSearchDate(value.format('DD-MM-YYYY HH:mm')))
  }

  return (
    <Space>
      <PickerWithType type={type} defaultData={defaultDataValue} onChange={(value, _) => onDateSelect(value, type) } />
    </Space>
  );
};

export default SwitchablePicker;
