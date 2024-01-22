'use client';
import API_UTIL from '@/services/ApiUtil';
import { TaskSchemaResolver } from '@/services/FormSchema';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from './Button';
import CommentInput from './CommentInput';
import CustomSelect from './CustomSelect';
import Input from './Input';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IColumns, IComment, ITask } from '@/interfaces/Project';
import { IUser } from '@/interfaces/User';

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

interface IModalProps {
  closeModal: (refresh?: boolean) => void;
  task: ITask;
  projectUsers?: IUser[];
  columns: IColumns[];
  columnId: string;
}

const TaskModal: FC<IModalProps> = ({ closeModal, task, projectUsers, columnId, columns }) => {
  const { handleSubmit, setValue, control } = useForm({ mode: 'onTouched', resolver: TaskSchemaResolver });

  const [originalTask, setoriginalTask] = useState({} as ITask);
  const [comments, setcomments] = useState({} as Record<string | number, IComment>);
  const pathName = usePathname();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    setValue('project', pathName.split('/')[1].split('_')[1]);
    setValue('column', columnId);
  }, [pathName]);

  useEffect(() => {
    if (task) {
      setoriginalTask(task);
      console.log(task);

      Object.entries(task).forEach((val: any) => {
        if (val[0] === 'comments') setcomments(Object.assign({}, val[1]));
        else if (val[0] === 'assignedTo') setValue(val[0], val[1]?._id);
        else setValue(val[0], val[1]);
      });
    }
  }, []);

  const onData = (type: any, data: IUser | string) => {
    if (type == 'assignedTo') data = projectUsers?.filter((e) => e.fullName == data)[0]._id || '';
    setValue(type, data);
  };

  const onSave = (data: any) => {
    console.log({ ...comments });
    data.comments = Object.values(comments);
    API_UTIL.post('/task/save-task', data).then((res) => {
      if (res.data) toast.success('Task created successfully');
      closeModal(true);
    });
  };

  const deleteTask = () => {
    API_UTIL.delete('/task/delete-task/?taskId=' + task._id).then((res) => {
      if (res.data) toast.success('Task deleted successfully');
      closeModal(true);
    });
  };

  const handleChange = (value: string, id: string) => {
    let index;
    if (id.split('comment')[1] == 'New') index = 'New';
    else index = Number.parseInt(id.split('comment')[1], 10);

    if (index === 'New' && (!value.trim().length || value === '<p><br></p>')) delete comments['New'];
    else if (index !== 'New' && value != '<p><br></p>') {
      let originalValue;
      if (!comments[index].isChanged) originalValue = comments[index].comment;
      else originalValue = comments[index].originalValue;
      if (value != originalValue)
        comments[index] = {
          ...comments[index],
          ...{ comment: value, originalValue: originalValue, isChanged: true, edit: '' }
        };
      else comments[index] = { ...comments[index], ...{ comment: originalValue, isChanged: false, edit: '' } };
    } else {
      comments['New'] = { comment: value };
    }

    setcomments({ ...comments });
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
        return `on ${fullDate} at ${parseInt(hours.toString()) > 10 ? hours : '' + hours}:${parseInt(date.getMinutes().toString()) > 10 ? date.getMinutes() : '0' + date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
      }
    }
  };

  const SaveComment = (comment: string) => {
    comments[comment].commentedBy = JSON.parse(window.localStorage.getItem('user') || '{}').fullName;
    const data = {
      comment: comments[comment],
      taskId: task._id
    };
    API_UTIL.post('/task/save-comment', data).then(({ data }) => {
      if (comment === 'New') {
        delete comments['New'];
        let oldComments: any = Object.values(comments);
        oldComments = [data, ...oldComments];
        setcomments(Object.assign({}, oldComments));
      } else {
        comments[comment] = { ...data, edit: 'done' };
        setcomments({ ...comments });
      }
    });
  };

  return (
    <div className="absolute flex flex-col gap-2 top-[50%] min-w-[85%] max-h-1/5 left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 w-100 p-4 px-2 rounded-md bg-slate-100 shadow-lg h-[88vh] overflow-hidden">
      <div className="flex flex-col gap-2">
        <div className="text-md text-[#395886] font-semibold flex px-4 relative items-center gap-4 min-h-[7.2vh]">
          {/* <span className="flex-1 text-2xl">{!!Object.keys(task).length ? task.taskName : 'Add Task'}</span> */}
          <Input
            control={control}
            id="taskName"
            type="text"
            placeholder="Task Name"
            parentPosition="items-start !gap-0 flex-1 rounded-md hover:border border-[#000]/60 "
            extraCss="!w-full !flex-1 !text-2xl !p-2 text-sm !bg-transparent !shadow-none hover:shadow-none border-none"
          />
          <CloseOutlinedIcon onClick={() => closeModal()} className="text-black self-center cursor-pointer" />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col p-4 gap-4 flex-1 pt-[1.5vw]">
            <div className="flex items-center gap-6 flex-wrap">
              <CustomSelect
                id="user"
                setData={onData}
                isUser={true}
                defaultSelectText={!!Object.keys(task).length ? task?.assignedTo?.fullName : 'Assign User'}
                options={projectUsers || []}
                parentCss="flex-[0.6]"
                extraCss="pl-5 flex items-center gap-4 bg-white border rounded-md p-[0.3rem] text-sm focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] mt-[2px]"
              />
              <div className="flex gap-5 flex-[1] justify-between">
                <div className=" text-xs flex gap-2 items-center">
                  {' '}
                  <CommentIcon className="text-base" /> {originalTask?.comments?.length} Comments
                </div>
                <div className="text-xs">
                  <AccessTimeIcon className="text-base" /> Last Updated By Sarthik Bhat,{' '}
                  {getUpdatedAt(originalTask?.updatedAt)}
                </div>
              </div>
              {/* <Input control={control} id="taskName" type="text" placeholder="Task Name" register={register} parentPosition="items-start !gap-0 flex-1 " extraCss="!w-full !p-2 text-sm" /> */}
            </div>
            <Input
              control={control}
              id="taskDesc"
              type="textarea"
              placeholder="Add a description for others to know about the task in detail"
              parentPosition="items-start !gap-0 "
              extraCss="!w-full !text-sm"
            />
            <div className="relative flex gap-2 flex-col">
              <div className="font-medium text-base text-[#395886]">Comments</div>
              <div className="w-[50%] h-px bg-[#395886]/50 mb-2"></div>
              <div className="overflow-scroll h-[35vh]  pr-[5px] flex flex-col gap-[10px] mb-[2px] pb-[10px] scroll-smooth">
                <div key="newCommentKey" className="relative flex flex-col">
                  <CommentInput
                    key="newComment"
                    type="new"
                    value={comments['New']?.comment || ''}
                    id={'commentNew'}
                    handleChange={handleChange}
                    placeholder="Add a comment"
                    parentPosition="items-start "
                    extraCss={'!w-full pt-[2%] !min-h-[13vh] ' + (!comments['New'] ? 'mb-[8%]' : '')}
                  />
                  {comments['New'] && (
                    <div className="self-end flex gap-2 mb-[2%]">
                      <div
                        onClick={() => SaveComment('New')}
                        key="newCancel"
                        className="right-[2px]  bottom-[5px] bg-[#395886] cursor-pointer text-[0.8rem] text-white p-1 px-2 mt-[44%] rounded-sm"
                      >
                        Cancel
                      </div>
                      <div
                        onClick={() => SaveComment('New')}
                        key="newSend"
                        className="right-[2px]  bottom-[5px] bg-[#395886] cursor-pointer text-[0.8rem] text-white p-1 px-2 mt-[44%] rounded-sm"
                      >
                        Send
                      </div>
                    </div>
                  )}
                </div>
                {Object.entries(comments).map((val) => {
                  return (
                    <div key={val[0]}>
                      {val[0] != 'New' && (
                        <div key={val[0]} className="relative flex flex-col">
                          <CommentInput
                            key={'comment_' + val[0]}
                            commentData={val[1]}
                            type="comments"
                            value={val[1].comment}
                            id={'comment' + val[0]}
                            handleChange={handleChange}
                            placeholder="Add a comment"
                            parentPosition="items-start "
                            extraCss="!w-full pb-[6vh] !min-h-[13vh]"
                          />
                          {val[1].isChanged && (
                            <div className="self-end flex gap-2">
                              <div
                                onClick={() => SaveComment(val[0])}
                                key={'cancel_' + val[0]}
                                className="right-[2px]  bottom-[5px] bg-[#395886] cursor-pointer text-[0.8rem] text-white p-1 px-2 mt-2 rounded-sm"
                              >
                                Cancel
                              </div>
                              <div
                                onClick={() => val[1].isChanged && SaveComment(val[0])}
                                key={'send_' + val[0]}
                                className="right-[2px]  bottom-[5px] bg-[#395886] cursor-pointer text-[0.8rem] text-white p-1 px-2 mt-2 rounded-sm"
                              >
                                Send
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-[0.3] flex-col gap-4 items-center justify-start p-4 h-[78vh] pt-0">
            <CustomSelect
              displayLabel={true}
              id="priority"
              label="Priority"
              extraCssForLabel="text-[0.8vw]"
              setData={onData}
              defaultSelectText={!!Object.keys(task).length ? task.priority : 'Priority'}
              isUser={false}
              options={['High', 'Medium', 'Low']}
              extraCss="flex items-center bg-white focus:outline-none border rounded-md p-2 text-sm focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] mt-[2px]"
            />
            <CustomSelect
              displayLabel={true}
              id="state"
              label="State"
              extraCssForLabel="text-[0.8vw]"
              disabled={true}
              setData={() => {}}
              isState={true}
              defaultSelectText={!!columnId ? columns.filter((e: IColumns) => e._id === columnId)[0].columnName : 'State'}
              isUser={false}
              colors={columns.reduce(
                (acc: Record<string, string>, curr: IColumns) => ({ ...acc, [curr.columnName]: curr.color }),
                {}
              )}
              options={columns.map((e: IColumns) => e.columnName)}
              extraCss="flex items-center bg-white focus:outline-none border rounded-md p-2 text-sm focus:outline-none shadow-sm shadow-[#B1C9EF] hover:shadow-md hover:shadow-[#D5DEEF] mt-[2px] gap-4 px-5"
            />
            <Input
              label="Estimation"
              extraCssForLabel="text-[0.8vw]"
              control={control}
              id="estimation"
              type="number"
              placeholder="Estimated days to finish"
              parentPosition="items-start !gap-0 "
              extraCss="!w-full !p-2 !text-sm"
            />
            <Input
              label="Actual"
              extraCssForLabel="text-[0.8vw]"
              control={control}
              id="actual"
              type="number"
              placeholder="Actual days taken to finish"
              parentPosition="items-start !gap-0 "
              extraCss="!w-full !p-2 !text-sm"
            />
            <div className="flex-1"></div>
            <div className="flex gap-[10px] w-[100%]">
              {!!Object.keys(task).length && (
                <div
                  onClick={() => deleteTask()}
                  className="flex items-center justify-end text-sm font-base text-purple-700 flex-1"
                >
                  <Button
                    text="Delete"
                    width="!w-[20%] max-w-[160px] !p-2 flex-1 bg-red-600 shadow-red-200
                        hover:text-red-600 !hover:bg-white hover:border hover:border-red-600 active:bg-red-600 active:text-white transition ease-in"
                  />
                </div>
              )}
              <div
                onClick={handleSubmit((data) => {
                  onSave(data);
                })}
                className="flex items-center justify-end text-sm font-base text-purple-700 flex-1"
              >
                <Button text="Save" width="!w-[20%] max-w-[160px] !p-2 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
