"use client"
import AddProjectButton from "@/components/AddProjectButton";
import Input from "@/components/Input";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const home: FC = ({ }) => {

  const {
    register,
    watch,
    control
  } = useForm();


  const searchBarValue = watch();

  useEffect(() => {
    console.log(searchBarValue);

  }, [searchBarValue])

  const handleChange = (e: string) => {

  }

  return (
    <section className="mt-10 flex flex-col gap-10 items-center">
      <div className="w-3/4 relative" style={{ margin: "0 auto" }}>
        <Input type="text" placeholder="Search Projects" register={register} customChange={handleChange} id="search" />
        <SearchTwoToneIcon
          className="absolute top-[40%] cursor-pointer"
          htmlColor="#9ca3b7"
          style={{ right: "12%" }}
        />
      </div>
      <div>
        <div className="text-2xl text-slate-500 text-center">Uh Oh !! ☹️</div>
        <div className="text-2xl text-slate-500 text-center">
          No Projects Here, please create projects
        </div>
      </div>
      <div className="w-2/4 flex gap-10 flex-wrap justify-center">
        <AddProjectButton />
      </div>
    </section>
  );
};

export default home;
