"use client"
import { IProject } from "@/app/addproject/page";
import AddProjectButton from "@/components/AddProjectButton";
import Input from "@/components/Input";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import '../styles.css';
import Loading from "@/components/Loading";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProjectCard from "@/components/ProjectCard";

const Home: FC = () => {

  const {
    register,
    watch
  } = useForm();

  const [projects, setprojects] = useState([] as IProject[])
  const [filteredProjects, setfilteredProjects] = useState([] as IProject[])
  const [starredProjects, setstarredProjects] = useState([] as IProject[])
  const [loading, setloading] = useState(true)

  const router = useRouter();

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined")
      token = window.localStorage.getItem("token") || ""
    AUTH_INTERCEPTOR.get("/project/get-project").then(res => {
      setprojects([...res.data])
      setfilteredProjects([...res.data])
      setloading(false);
    })
  }, [])


  const handleChange = (val: string) => {

    if (!val.trim().length) {
      setfilteredProjects(projects);
      setstarredProjects([...starredProjects]);
    }
    else {
      const filterProjects = projects.filter(e => e.projectName.toLowerCase().includes(val.toLowerCase()))
      const filterProjectsStarred = starredProjects.filter(e => e.projectName.toLowerCase().includes(val.toLowerCase()))
      setfilteredProjects(filterProjects);
      setstarredProjects([...filterProjectsStarred]);
    }

  }

  const addToStarred = (project: IProject) => {
    console.log(starredProjects);
    filteredProjects.filter(e => e._id === project._id)[0].starred = !project?.starred;
    if (project.starred)
      setstarredProjects([...starredProjects, project])
    else {
      starredProjects.splice(starredProjects.findIndex(e => e._id === project._id), 1);
    }
    setfilteredProjects([...filteredProjects])
  }

  return (
    <>
      {!!loading && <Loading />}
      <section className="mt-10 flex flex-col gap-6 relative">
        <img src="/assets/images/left.svg" alt="left-side-img-man-working" className="!fixed -left-10 bottom-0 w-[17%] hidden lg:block" />
        <img src="/assets/images/right.svg" alt="right-side-img-woman-working" className="!fixed right-0 -bottom-4 w-[15%] hidden lg:block" />
        <div className="bg-[#395886] w-full p-[3%] -z-[12] absolute -top-[9%]"></div>
        <div className="w-3/4 relative" style={{ margin: "auto" }}>
          <Input type="text" placeholder="Search Projects" register={register} customChange={handleChange} id="search" extraCss="!p-3" />
          <SearchTwoToneIcon
            className="absolute top-[40%] cursor-pointer"
            htmlColor="#9ca3b7"
            style={{ right: "12%" }}
          />
        </div>
        <div className="w-2/4 flex flex-wrap justify-center ml-[0.7rem]">
          <AddProjectButton />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-2/4 flex justify-center text-2xl text-[#395886] ml-4">Starred Projects
          </div>
          <div className="w-2/4 bg-[#395886]/30 h-[0.1px] ml-[20%] -mt-2"></div>
          {
            starredProjects.length ?
              <div className="flex w-3/5 gap-5 flex-wrap p-4 rounded ml-[19%] text-[#395886] font-medium tracking-wider -mt-2">
                {
                  starredProjects.map((project, index) => {
                    return (
                      <ProjectCard key={index} project={project} addToStarred={addToStarred} />
                    )
                  })
                }
                {
                  starredProjects.length > 4
                  &&
                  <div onClick={() => router.push(`/home`)} className="p-3 self-center flex shadow w-15 h-15 cursor-pointer rounded-full bg-[#D5DEEF]">
                    <ArrowForwardIcon className="text-md text-[#395886] self-center" />
                  </div>
                }
              </div>
              :
              <div className="flex w-3/5 gap-10 flex-wrap p-4 rounded ml-[20%] bg-[#D5DEEF] text-[#395886] font-medium tracking-wider mt-8">
                No Starred Projects
              </div>
          }
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-2/4 flex justify-center text-2xl text-[#395886]">My Projects
          </div>
          <div className="w-2/4 bg-[#395886]/30 h-[0.1px] ml-[20%] -mt-2"></div>
          {
            !!filteredProjects.length
              ?
              <div className="flex w-3/5 gap-5 flex-wrap p-4 rounded ml-[19%] -mt-2">
                {
                  filteredProjects.map((project, index) => {
                    return (
                      <ProjectCard key={index} project={project} addToStarred={addToStarred} />
                    )
                  })
                }
                {
                  filteredProjects.length > 4
                  &&
                  <div onClick={() => router.push(`/home`)} className="p-3 self-center flex shadow w-15 h-15 cursor-pointer rounded-full bg-[#D5DEEF]">
                    <ArrowForwardIcon className="text-md text-[#395886] self-center" />
                  </div>
                }
              </div> :
              <div className="">
                <div className="flex w-3/5 max-w-3/5 gap-10 flex-wrap p-4 rounded ml-[20%] bg-[#D5DEEF] text-[#395886] font-medium tracking-wider mt-8">
                  Uh Oh !! ☹️ <br /> No Projects Here, Please add projects
                </div>
              </div>
          }
        </div>

      </section>
    </>
  );
};

export default Home;
