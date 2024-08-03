import axios from "axios";

export const generateResponse = async (
  prompt: string,
  modelSelected: string
) => {
  const data = JSON.stringify({
    selectedAPI: modelSelected,
    prompt: prompt,
  });

  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_URL}/prompt`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const res = await axios.request(options);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
