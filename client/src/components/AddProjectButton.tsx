import { FC } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useRouter } from "next/navigation";
const AddProjectButton: FC = () => {

  const router = useRouter();

  return (
    <div onClick={() => router.push("/addproject")} className="text-sm w-100 p-3 rounded-md bg-[#395886] text-white focus:outline-none shadow-lg shadow-[#B1C9EF] items-center flex gap-1 justify-center cursor-pointer">
      <AddTwoToneIcon />
      Add New Project
    </div>
  );
};

export default AddProjectButton;
