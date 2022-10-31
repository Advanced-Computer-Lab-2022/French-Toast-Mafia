import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from 'antd';
import React from 'react';
import '../App.css';


const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
  
};

const menu = (
  <Menu
    onClick={onClick}
    items={[
      {
        label: '1st menu item',
        key: '1',
      },
      {
        label: '2nd menu item',
        key: '2',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);
const CountriesDropdown = () => (
  <header className='Dropdown'>
  <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Select Your Country
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  </header>
);


export default CountriesDropdown;