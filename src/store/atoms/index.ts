import { atom } from "recoil";

export const modelSelectedState = atom<string | null>({
  key: "modelSelected",
  default: null,
});

export const modelPrompt = atom<string | null>({
  key: "modelPropmt",
  default: null,
});
