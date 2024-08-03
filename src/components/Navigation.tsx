/// <reference types="vite-plugin-svgr/client" />

import ProfileSvg from "../assets/profile_round.svg?react";
import MessageSvg from "../assets/message_square_list.svg?react";

function Navigation() {
  return (
    <div className="h-screen bg-black text-white flex">
      <div className="border-r border-[#262626] px-3 py-6 flex flex-col justify-between">
        <div className="p-1.5 hover:bg-[#2b2a2a] rounded-md">
          <MessageSvg />
        </div>
        <div className="p-1.5 hover:bg-[#2b2a2a] rounded-md">
          <ProfileSvg />
        </div>
      </div>
      <div className="flex flex-col w-full px-3 py-6">
        <div className="border-b-2 border-[#262626] font-semibold text-xl">
          <div className="mb-1">Workspace</div>
        </div>
        <div className="max-h-[calc(100%-50px)] grow flex flex-col">
          <div className="mt-2 ">
            <button className="text-black bg-white hover:bg-gray-200 px-6 py-1 rounded-md w-full">
              + New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
