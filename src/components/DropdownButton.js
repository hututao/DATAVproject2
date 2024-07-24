import React, { useState } from 'react';
import Button from '@mui/material/Button';
const DropdownButton = ({control,setControl}) => {
  // 定义一个状态变量，用于控制下拉菜单的显示与隐藏
  const [showDropdown, setShowDropdown] = useState(false);
  
  // 定义一个状态变量，保存选中的选项
  const [selectedOption, setSelectedOption] = useState('Select an option');
  // 定义选项数组
  const options = ['Pie', 'Bar'];

  // 切换下拉菜单显示状态的函数
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // 处理选项点击的函数
  const handleOptionClick = ({option,control}) => {
    setSelectedOption(option);
    if (option === 'Pie') {
      setControl(true);
    } else {
      setControl(false);
    }
    setShowDropdown(false);
  };

  return (
    <div className="dropdown">
      <Button variant="contained" onClick={toggleDropdown} className="dropdown-button">
        {selectedOption}
      </Button>
      {showDropdown && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick({option,control})}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }
        .dropdown-item {
          padding: 10px 20px;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default DropdownButton;
