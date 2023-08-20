import { FC } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useRouter } from "next/navigation";
const AddProjectButton: FC = () => {

  const router = useRouter();

  return (
    <div onClick={() => router.push("/addproject")} className="w-100 p-4 rounded-md bg-purple-400 text-white focus:outline-none shadow-lg shadow-purple-300 items-center flex gap-2 justify-center cursor-pointer">
      <AddTwoToneIcon />
      Add New Project
    </div>
  );
};

export default AddProjectButton;
