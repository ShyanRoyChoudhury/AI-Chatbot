import axios from "axios";

export async function getPrompt(id: string){
    try{

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_URL}/prompt/${id}`,
            headers: { 
                "Content-Type": "application/json",
            }
        };

        const res = axios.request(config)
        return res
    }catch(e){
        console.error(e)
    }
}