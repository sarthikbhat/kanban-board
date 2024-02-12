'use client';
import { FC, MouseEvent } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import { IProject } from '@/interfaces/Project';

interface InputProps {
  project: IProject;
  addToStarred: (project: IProject) => void;
  starred?: boolean;
}

const ProjectCard: FC<InputProps> = ({ project, addToStarred, starred }) => {
  const router = useRouter();

  const sendStarredProject = (project: IProject, event: MouseEvent) => {
    addToStarred(project);
    event.stopPropagation();
  };
  return (
    <div
      onClick={() => router.push(`/${project.projectName + '__' + project._id}/boards`)}
      className="flex flex-col border shadow w-[19%] min-h-[10vh] max-h-[25vh] cursor-pointer rounded bg-[#D5DEEF] text-[#395886] font-medium tracking-wider"
    >
      <div className="p-4 py-3 gap-2 flex flex-col h-[100%]">
        <div className="text-xl font-medium tracking-wider break-words">{project && project?.projectName}</div>
        {/* <div className="text-xl font-medium tracking-wider">{project && project?.projectName.substring(0, 1) + (project?.projectName.length > 1 ? '...' : '')}</div> */}
        <div className="flex justify-between items-end h-[100%]">
          <div className="text-sm font-normal tracking-wider">
            {(project && !starred) &&
              project?.projectDescription.substring(0, 15) + (project?.projectDescription.length > 15 ? '...' : '')}
          </div>
          <StarIcon
            onClick={(event) => {
              sendStarredProject(project, event);
            }}
            className={'self-end font-bolder ' + (project?.starred ? 'text-yellow-300' : 'text-[#B1C9EF]')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
