import { FC } from "react";

interface InputProps {
  text: string;
  width?: string;
  onClick: (e: any) => void;
  type?: "filled" | "outlined";
}

const Button: FC<InputProps> = ({
  text,
  width = "w-4/5 ",
  onClick,
  type = "filled",
}) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={
        (type === "filled"
          ? "bg-purple-400 text-white shadow-lg shadow-purple-300 hover:text-purple-400 hover:bg-white hover:border hover:border-purple-400 hover:shadow-none active:bg-purple-400 active:text-white transition ease-in"
          : "text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-white active:text-purple-400 active:bg-white transition ease-in") +
        " p-4 rounded-md focus:outline-none " +
        width
      }
    >
      {text}
    </button>
  );
};

export default Button;
