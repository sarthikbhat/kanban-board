'use client';
import { FC, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IComment } from '@/interfaces/Project';

const IndexToMonthMap: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

interface InputProps {
  id: string;
  type?: string;
  placeholder: string;
  extraCss?: string;
  parentPosition?: string;
  value: string;
  commentData?: IComment;
  handleChange: (value: string, name: string) => void;
}

const CommentInput: FC<InputProps> = ({
  id,
  type,
  placeholder,
  extraCss,
  commentData = {} as IComment,
  parentPosition = 'items-center',
  value,
  handleChange
}) => {
  const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    commentData?.edit === 'done' && setEdit(false);
  }, [commentData]);

  const handleChangeChild = (newValue: any, source: any, id: string) => {
    if (source !== 'api') {
      handleChange(newValue, id);
    }
  };

  const callMe = () => {
    console.log('Call API');
  };

  const getUpdatedAt = (time: string | undefined) => {
    if (time) {
      const localTime = new Date(time).toLocaleString();
      const now = new Date().getTime();
      const then = new Date(localTime).getTime();
      const diff = (now - then) / 60000;

      if (Math.round(diff) == 0) return ' just now';
      else if (Math.round(diff) < 60) {
        const minutes = Math.round(diff);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (Math.round(diff / 60) > 0 && Math.round(diff / 60) < 24) {
        const hours = Math.round(diff / 60);
        return hours + ` hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const date = new Date(localTime);
        const hours =
          date.getHours() > 12 ? (date.getHours() - 12 < 10 ? '0' : '') + (date.getHours() - 12) : date.getHours();
        const fullDate = `${IndexToMonthMap[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        return `on ${fullDate} at ${parseInt(hours.toString()) > 10 ? hours : '' + hours}:${
          parseInt(date.getMinutes().toString()) > 10 ? date.getMinutes() : '0' + date.getMinutes()
        } ${date.getHours() > 12 ? 'PM' : 'AM'}`;
      }
    }
  };

  return (
    <div data-type={type} className={'flex gap-2 w-full relative' + parentPosition}>
      <div
        className={
          'text-xs w-[5vh] p-[0.5rem] bg-white border rounded-full self-start text-center ' + (type === 'new' ? 'mt-3' : '')
        }
      >
        {(commentData.commentedBy || JSON.parse(window.localStorage.getItem('user') || '{}')?.fullName)
          ?.split(' ')
          .map((e: string) => e.charAt(0))
          .splice(0, 2)}
      </div>
      {type === 'comments' && !edit ? (
        <div className="p-3 border border-[#000000]/10 text-sm w-full pt-[7%] min-h[10vh] pb-[3%] group">
          <div onClick={() => setEdit(!edit)} dangerouslySetInnerHTML={{ __html: value }}></div>
          <div className="absolute top-2 right-2 flex gap-1 text-[#000]/70">
            <EditIcon className="text-base hidden group-hover:block hover:cursor-pointer" onClick={() => setEdit(!edit)} />{' '}
            <DeleteIcon className="text-base hover:cursor-pointer hover:text-red-500 hidden group-hover:block " />
          </div>
          <div className="text-xs absolute top-[1vh] left-[7vh] text-[#000]/50 flex items-center gap-2">
            <div className="font-medium text-underline text-sm">{commentData.commentedBy}</div>
            <div className="underline">{getUpdatedAt(commentData?.updatedAt)}</div>
          </div>
        </div>
      ) : (
        <ReactQuill
          onBlur={callMe}
          placeholder={placeholder}
          className={'w-4/5 max-w-4/5 ' + (extraCss ? extraCss : '')}
          theme="snow"
          value={value}
          onChange={(newValue: any, delta: any, source: any) => handleChangeChild(newValue, source, id)}
        />
      )}
    </div>
  );
};

export default CommentInput;
