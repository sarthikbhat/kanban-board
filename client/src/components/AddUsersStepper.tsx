'use client';
import API_UTIL from '@/services/ApiUtil';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from './AutoComplete';
import Input from './Input';
import { IUser } from '@/interfaces/User';
import { IProject } from '@/interfaces/Project';

interface AddUserStepperProps {
  addUserToProject: (user: any) => void;
  project: IProject;
}

const AddUserStepper: FC<AddUserStepperProps> = ({ addUserToProject, project }) => {
  const { control } = useForm();
  const [value, setvalue] = useState('');

  const [users, setusers] = useState([project?.users[0]]);
  const [suggestions, setsuggestions] = useState([] as IUser[]);
  const [currentUser, setcurrentUser] = useState({} as IUser);

  const getUserData = (value: string) => {
    setvalue(value);
  };

  const addUser = (user: any) => {
    const payload = {
      ...{ projectName: project.projectName },
      users: [...users, user]
    };
    API_UTIL.post('/project/save-project-users', payload).then((res) => {
      setusers([...users, user]);
      addUserToProject(res.data);
    });
    setvalue('');
  };

  useEffect(() => {
    setcurrentUser(JSON.parse(window.localStorage.getItem('user') || '{}'));
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (value.length >= 3) {
        let payload = {
          search: value,
          user: JSON.parse(window.localStorage.getItem('user') || '{}'),
          projectName: project.projectName
        };
        API_UTIL.post('/project/get-all-users', payload).then((res) => {
          setsuggestions(res.data);
        });
      } else {
        setsuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timeOut);
  }, [value]);

  const deleteUser = (user: IUser) => {
    // API_UTIL.delete(`/project/delete-project-user?projectName=${project.projectName}&userName=${user.fullName}`).then(res => {
    //   setusers(res.data.users);
    // })
  };

  return (
    <>
      <Input
        type="text"
        placeholder="John Doe"
        parentPosition="items-start"
        label="Add Users"
        extraCss="!w-3/5"
        handleChangeBoolean={true}
        handleChange={getUserData}
        id="users"
        control={control}
      />
      <AutoComplete addUser={addUser} suggestions={suggestions} />
      <div className="text-md text-slate-600">Collaborators</div>
      <div className="border p-4 shadow shadow-slate-100 w-3/5 max-h-72 overflow-hidden overflow-y-auto -mt-8 rounded scroll-smooth ">
        {users.map((e, index) => {
          return (
            <div key={index} className=" group px-4 py-2 flex gap-4 items-center">
              <div className="rounded-full p-2 text-sm border border-slate-400 shadow-lg text-slate-700">
                {e.fullName
                  .split(' ')
                  .map((e) => e.charAt(0))
                  .splice(0, 2)}
              </div>
              <div className="flex flex-col w-[50%]">
                <span className="text-sm">{e.fullName}</span>
                <span className="text-slate-400 text-xs">{e.userName}</span>
              </div>
              <div className="text-sm font-medium text-slate-600 flex-1">
                Admin {e.fullName === currentUser?.fullName ? "(It's You)" : ''}
              </div>
              <div
                onClick={() => deleteUser(e)}
                className="text-sm flex group items-center font-medium p-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 transition ease-in hover:rounded--md cursor-pointer"
              >
                Remove
                <DeleteOutlineTwoToneIcon className="text-[1.1rem] ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddUserStepper;
