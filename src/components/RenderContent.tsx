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
            <div className="rounded-md p-4 bg-black ml-auto w-3/5 font-normal text-md">{prompt}</div>
            <div className="bg-black p-4 w-3/5">

                <div>Image Generated</div>
                <img key={index} src={url} alt={`Generated content ${index}`} />
            </div>
        </div>
      ));
    }

    if (responseData.data.model === "stableDiffusion") {
      const imageBase64 = responseData.data.content;
      return (
        <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-black ml-auto w-3/5 font-normal text-md">{prompt}</div>
            <div className="bg-black p-4 w-3/5">

                <div>Image Generated</div>
            <img src={`data:image/png;base64,${imageBase64}`} alt="Generated content" />
        </div>
        </div>
      );
    }

    if (responseData.data.model === "zeroGPT") {
        const { gpt_generated_sentences } = responseData.data.content.data;
        return (
            <div className="space-y-4 p-4">
            <div className="rounded-md p-4 bg-black ml-auto w-3/5 font-normal text-sm">{prompt}</div>
            <div className="bg-black p-4 w-3/5">
              <div>Detection Complete</div>
              <div>
                {gpt_generated_sentences.length !== 0 ? (
                    <div>
                        <span className="text-sm font-normal">AI Generated Texts:</span>
                        <ul className="list-disc pl-5 space-y-2 mt-1">
                        {gpt_generated_sentences.map((sentence, index) => (
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

    return null;
  };