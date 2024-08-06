import { getPrompt } from "@/lib/getPrompt";
import { modelPrompt, responseState } from "@/store/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

function RecentChats() {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const setResponseData = useSetRecoilState(responseState);
  const setPrompt = useSetRecoilState(modelPrompt);

  useEffect(() => {
    async function fetchChats() {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.BACKEND_URL}/prompt`,
          headers: { 

           }
        };

        const response = await axios.request(config);
        setChats(response.data.prompts);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching chats:", e);
        setError("Error fetching chats");
        setLoading(false);
      }
    }

    fetchChats();
  }, []);

  const handleClick = async (chat:any) => {
    try{
      const res = await getPrompt(chat._id)
      setResponseData(res?.data)
      setPrompt(res?.data.data.prompt)
    }catch(e){
      console.error("Error fetching chats")
      setError("Error fetching chats");
        setLoading(false);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full p-1 h-full space-y-2 flex flex-col">
      <div>Recent Chats</div>
      <div className="space-y-1.5 grow basis-0 overflow-y-scroll custom-scrollbar">
        {chats.map((chat:any, index) => (
          <div key={index} className="bg-[#262626] rounded-md px-2 hover:bg-black hover:border hover:border-[#262626]
                py-1 text-sm font-light line-clamp-2"
            onClick={()=>handleClick(chat)}
            >{chat.prompt}
            </div>
        ))}
      </div>
    </div>
  );
}

export default RecentChats;
