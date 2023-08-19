import AddProjectButton from "@/components/AddProjectButton";
import Input from "@/components/Input";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { FC } from "react";

const home: FC = ({}) => {
  return (
    <section className="mt-10 flex flex-col gap-10 items-center">
      <div className="w-3/4 relative" style={{ margin: "0 auto" }}>
        <Input type="text" placeholder="Search Projects" />
        <SearchTwoToneIcon
          className="absolute top-1/3"
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
