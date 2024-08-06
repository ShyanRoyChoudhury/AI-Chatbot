/// <reference types="vite-plugin-svgr/client" />
import { modelPrompt, modelSelectedState, responseState } from "@/store/atoms";
import SendSvg from "../assets/send_vector_icon.svg?react";
import LoaderSvg from "../assets/loader.svg?react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { generateResponse } from "@/lib/generateResponse";
import { useState } from "react";

function InputBox() {
  const [input, setInput] = useState<string>("")
  const  setPrompt = useSetRecoilState(modelPrompt);
  const [loaderActive, setLoaderActive] = useState<boolean>(false);
  const setResponseData = useSetRecoilState(responseState);
  const modelSelected = useRecoilValue(modelSelectedState);

  const handlePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(()=>e.target.value);
  };


  const handleSend = async () => {
    try{
      if (input && modelSelected) {
        setLoaderActive(true)
        const response = await generateResponse(input, modelSelected);
        setPrompt(input)
        if(response?.status === 200){
          const data = response?.data;
          console.log('call from textbox',data)
          setResponseData(data);
          setLoaderActive(false)
          setInput("")
        }
      }else{
        alert('input id and model to generate response')
      }
    }catch(e){
      setLoaderActive(false)
      console.error("Error fething data:", e);
    }
  };

  
  return (
    <div>
      <div className="flex border border-[#262626] rounded-xl min-h-[60px]  w-full items-center justify-center px-3">
        <textarea
          placeholder="Ask anything"
          className="placeholder:text-muted-foreground focus-visible:ring-ring 
          text-md w-full resize-none bg-transparent py-2 focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-0 text-white items-center "
          onChange={handlePrompt}
          disabled={loaderActive}
          value={input}
          />
          {
            loaderActive? <LoaderSvg height={30} width={30}/> :
              <button className="items-center bg-white rounded-full" onClick={handleSend}>
                  <div><SendSvg /></div>
              </button>
          }
          
      </div>
    </div>
  );
}

export default InputBox;
