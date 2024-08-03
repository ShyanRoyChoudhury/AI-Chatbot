/// <reference types="vite-plugin-svgr/client" />
import { modelPrompt, modelSelectedState } from "@/store/atoms";
import SendSvg from "../assets/send_vector_icon.svg?react";
import { useRecoilState, useRecoilValue } from "recoil";
import { generateResponse } from "@/lib/generateResponse";

function InputBox() {
  const [prompt, setPrompt] = useRecoilState(modelPrompt);
  const modelSelected = useRecoilValue(modelSelectedState);
  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSend = async () => {
    if (prompt && modelSelected) {
      const response = await generateResponse(prompt, modelSelected);
    }
  };
  return (
    <div className="flex border border-[#262626] rounded-xl min-h-[60px]  w-full items-center justify-center">
      {/* <button className="text-white mx-auto px-3">
        {" "}
        <PlusSvg />{" "}
      </button> */}
      <div className="px-1 ml-1"></div>
      <textarea
        placeholder="Ask anything"
        className="placeholder:text-muted-foreground focus-visible:ring-ring 
        text-md w-full resize-none bg-transparent py-2 focus-visible:outline-none 
        disabled:cursor-not-allowed disabled:opacity-0 text-white items-center"
        onChange={handlePrompt}
      />
      <button className="items-center px-3" onClick={handleSend}>
        <div className="bg-white rounded-full">
          <SendSvg />
        </div>
      </button>
    </div>
  );
}

export default InputBox;
