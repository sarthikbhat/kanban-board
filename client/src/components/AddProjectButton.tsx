import { FC } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
const AddProjectButton: FC = () => {
  return (
    //   <div className="shadow border rounded-md" style={{width:'20vh',height:'20vh',padding:'2%'}}>

    //   </div>
    <div className="w-100 p-4 rounded-md bg-purple-400 text-white focus:outline-none shadow-lg shadow-purple-300 items-center flex gap-2 justify-center">
      <AddTwoToneIcon />
      Add New Project
    </div>
  );
};

export default AddProjectButton;
