import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const productsState = atom({
  key: "productsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default productsState;
