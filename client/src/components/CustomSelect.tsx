'use client';
import { IUser } from '@/interfaces/User';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IModalProps {
  defaultSelectText: string;
  parentCss?: string;
  options: any[];
  isUser?: boolean;
  isState?: boolean;
  extraCss?: string;
  colors?: Record<string, string>;
  disabled?: boolean;
  displayLabel?: boolean;
  extraCssForLabel?: string;
  label?: string;
  id: string;
  error?: any;
  setData: (type: string, value: string | IUser) => void;
}

const CustomSelect: FC<IModalProps> = ({
  defaultSelectText,
  options,
  colors,
  isUser = true,
  extraCss,
  parentCss,
  setData,
  isState,
  disabled = false,
  displayLabel = false,
  extraCssForLabel,
  label,
  error,
  id
}) => {
  const [defaultSelectTextState, setdefaultSelectText] = useState('');
  const [showOptionList, setshowOptionList] = useState(false);
  const [optionsList] = useState(options);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setdefaultSelectText(defaultSelectText);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [defaultSelectText]);

  const handleClickOutside = (e: any) => {
    if (!e.target.classList.contains('custom-select-option') && !e.target.classList.contains('selected-text')) {
      setshowOptionList(false);
    }
  };

  // This method handles the display of option list
  const handleListDisplay = () => {
    setshowOptionList(!showOptionList);
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  const handleOptionClick = (e: any) => {
    setdefaultSelectText(e.target.getAttribute('data-name'));
    setshowOptionList(false);
    setData(isUser ? 'assignedTo' : 'priority', e.target.getAttribute('data-name'));
  };

  return (
    <div className={'custom-select-container text-ellipsis ' + (!!parentCss?.length ? parentCss : '')}>
      {displayLabel && (
        <label
          htmlFor={id}
          className={
            'text-md text-slate-600 self-start ' +
            (parentCss === 'items-center' ? 'ml-20' : '') +
            (error && error[id]?.message ? ' !text-red-500' : '' + ' ' + extraCssForLabel)
          }
        >
          {label}
        </label>
      )}
      <div
        id={id}
        className={
          (showOptionList ? 'selected-text active' : 'selected-text') +
          ' text-ellipsis overflow-hidden cursor-pointer ' +
          extraCss
        }
        onClick={() => {
          !disabled && handleListDisplay();
        }}
      >
        {isUser && (
          <div
            className={
              'text-xs p-[0.3rem] bg-white border drop-shadow-lg rounded-full self-start' +
              (defaultSelectTextState === 'Assign User' ? ' !text-white !drop-shadow-none' : '')
            }
          >
            {defaultSelectTextState
              ?.toString()
              .split(' ')
              .map((e) => e.charAt(0))
              .splice(0, 2)}
          </div>
        )}
        {isState && defaultSelectTextState && (
          <span style={{ background: colors && colors[defaultSelectTextState] }} className={`rounded-full w-4 h-4`}></span>
        )}
        {defaultSelectTextState}
        {/* <div className="flex-[0.3]" /> */}
        {!disabled && <ArrowDropDownOutlinedIcon className="justify-self-end absolute right-2 text-sm z-10" />}
      </div>
      {showOptionList && (
        <ul className="select-options bg-white mt-1 shadow">
          {optionsList.map((option: any) => {
            return (
              <li
                className={
                  'custom-select-option p-2 px-5 border-b-2 flex gap-4 items-center cursor-pointer hover:bg-[#B1C9EF]/50 text-sm ' +
                  (defaultSelectText === (option.fullName || option) ? 'bg-[#B1C9EF]/30' : '')
                }
                data-name={option.fullName || option}
                key={option.userName || option}
                onClick={handleOptionClick}
              >
                {isState && (
                  <span style={{ background: colors && colors[option] }} className={`rounded-full w-4 h-4`}></span>
                )}
                {option?.fullName || option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
