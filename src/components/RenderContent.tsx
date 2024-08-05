// @ts-nocheck

import { modelPrompt, responseState } from "@/store/atoms";
import { useRecoilValue } from "recoil";


export const RenderContent = () => {
    const responseData = useRecoilValue(responseState);
    const prompt = useRecoilValue(modelPrompt);
    if (!responseData || responseData.status !== "Success") {
      return null;
    }

    if (responseData.data.model === "replicate") {
      return responseData.data.content.map((url, index) => (
        <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-[#131313] ml-auto w-3/5 font-normal text-md">{prompt}</div>
            <div className="bg-black p-4 w-3/5 rounded-md">
            <div>Response from Replicate</div>
            <div className="text-sm font-medium">Image Generated</div>
                <img key={index} src={url} alt={`Generated content ${index}`} />
            </div>
        </div>
      ));
    }

    if (responseData.data.model === "stableDiffusion") {
      const imageBase64 = responseData.data.content;
      return (
        <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-[#131313] ml-auto w-3/5 font-normal text-md">{prompt}</div>
            <div className="bg-black p-4 w-3/5 rounded-md">
            <div>Response from Stable Diffusion</div>
            <div className="text-sm font-medium">Image Generated</div>
            <img src={`data:image/png;base64,${imageBase64}`} alt="Generated content" />
        </div>
        </div>
      );
    }

    if (responseData.data.model === "zeroGPT") {
        const { h } = responseData.data.content.data;
        return (
            <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-[#131313] ml-auto w-3/5 font-normal text-sm">{prompt}</div>
            <div className="bg-black p-4 w-3/5 rounded-md">
              <div>Response from ZeroGPT</div>
              <div className="text-sm font-medium">Detection Complete</div>
              <div>
                {h.length !== 0 ? (
                    <div>
                        <span className="text-sm font-normal">AI Generated Texts:</span>
                        <ul className="list-disc pl-5 space-y-2 mt-1">
                        {h.map((sentence, index) => (
                            <li key={index} className="text-white text-sm font-normal">{sentence}</li>
                        ))}
                        </ul>
                    </div>
                ) : (
                  <div className="text-xs font-normal">No GPT-generated sentences found.</div>
                )}
              </div>
            </div>
          </div>
        );
      }
    if(responseData.data.model === "claude"){
      const data = responseData.data.content[0];
      console.log('inside claude dislplay',data)
      return(
        <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-[#131313] ml-auto w-3/5 font-normal text-md">{prompt}</div>
            <div className="bg-black p-4 w-3/5 rounded-md">
              <div className="">Response from Claude</div>
                <div className="text-xs font-normal">{data.text}</div>
                
            </div>
        </div>
      )
    }

    return null;
  };