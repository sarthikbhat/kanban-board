import { FC } from 'react';

const AuthSide: FC = ({}) => {
  return (
    <section className="p-10 flex flex-col justify-between h-full">
      <h1 className="text-2xl tracking-wider text-left text-white font-bold">Hey Welcome!!</h1>
      <span>
        <h1 className="text-7xl tracking-wider text-center font-bold text-white">KANBAN BOARD</h1>
        <h4 className="text-xl tracking-wider text-center font-bold text-[#D5DEEF] mt-3">
          Kan all the boring trackers to ban the slow development
        </h4>
      </span>
      <div></div>
    </section>
  );
};

export default AuthSide;
