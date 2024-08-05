import { useSetRecoilState } from "recoil";
import InputBox from "../components/InputBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modelSelectedState } from "@/store/atoms";
import { RenderContent } from "@/components/RenderContent";

function Home() {
  const setModelSelected = useSetRecoilState(modelSelectedState);
  const handleSelect = (value: string) => {
    setModelSelected(value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow px-6 md:px-12 lg:px-20">
        <div className="text-white font-semibold text-xl">
          
          {RenderContent()}
        </div>
      </div>
      <div className="px-6 md:px-12 lg:px-20 pb-4 space-y-1.5">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[160px] bg-transparent text-white border-[#262626]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="stableDiffusion">Stable Diffusion</SelectItem>
            <SelectItem value="zeroGPT">ZeroGPT</SelectItem>
            <SelectItem value="replicate">Replicate</SelectItem>
            <SelectItem value="huggingFace">HuggingFace</SelectItem>
          </SelectContent>
        </Select>
        <InputBox />
      </div>
    </div>
  );
}

export default Home;
