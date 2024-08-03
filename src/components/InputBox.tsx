/// <reference types="vite-plugin-svgr/client" />
import { modelPrompt, modelSelectedState, responseState } from "@/store/atoms";
import SendSvg from "../assets/send_vector_icon.svg?react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { generateResponse } from "@/lib/generateResponse";
import { useState } from "react";

function InputBox() {
  const [input, setInput] = useState<string | null>(null)
  const [prompt, setPrompt] = useRecoilState(modelPrompt);
  const setResponseData = useSetRecoilState(responseState);
  const modelSelected = useRecoilValue(modelSelectedState);

  const handlePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    try{
      setPrompt(input)
      if (prompt && modelSelected) {
        const response = await generateResponse(prompt, modelSelected);
        if(response?.status === 200){
          const data = response?.data;
          setResponseData(data);
          console.log(data)
        }
      }
    }catch(e){
      console.error("Error fething data:", e);
    }
  };

  
  return (
    <div>
    <div className="flex border border-[#262626] rounded-xl min-h-[60px]  w-full items-center justify-center">
      <div className="px-1 ml-1"></div>
      <textarea
        placeholder="Ask anything"
        className="placeholder:text-muted-foreground focus-visible:ring-ring 
        text-md w-full resize-none bg-transparent py-2 focus-visible:outline-none 
        disabled:cursor-not-allowed disabled:opacity-0 text-white items-center "
        onChange={handlePrompt}
        />
      <button className="items-center px-3" onClick={handleSend}>
        <div className="bg-white rounded-full">
          <SendSvg />
        </div>
      </button>
    </div>
        </div>
  );
}

export default InputBox;
