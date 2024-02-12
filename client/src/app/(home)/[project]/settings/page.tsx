'use client';
import Button from '@/components/Button';
import { useApi } from '@/hooks/useApi';
import { IProject } from '@/interfaces/Project';
import API_UTIL from '@/services/ApiUtil';
import SecurityIcon from '@mui/icons-material/Security';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const ProjectSettings: FC = () => {
  const [project, setproject] = useState({} as IProject);
  const pathName = usePathname();
  const [ response ] = useApi(
    '/project/get-project-by-name?projectName=' + decodeURI(pathName.split('/')[1].split('__')[0]),
    { method: 'GET' }
  );

  useEffect(() => {
    if (response) setproject(response.data);
  }, [response]);

  return (
    <>
      {
        <section className="flex flex-col gap-8 p-4 px-6 w-full ">
          <div className="text-2xl font-medium text-[#395886] flex flex-col gap-1">
            <div>
              {project.projectName}{' '}
              <span className="text-sm font-regular">
                (<SecurityIcon className="text-base mr-1" />
                Private)
              </span>
            </div>
            <div className="text-sm font-medium tracking-wider px-1 text-[#000000]/60">{project.projectDescription}</div>
          </div>
          <div className="flex text-sm font-base">
            <Button
              text="Delete"
              width="!w-[20%] max-w-[120px] flex-1 !p-2.5  bg-red-600 shadow-red-200
                        hover:text-white hover:bg-red-600 hover:border hover:border-red-600 active:bg-red-600 active:text-white transition ease-in !text-sm"
            />
          </div>
        </section>
      }
    </>
  );
};

export default ProjectSettings;
