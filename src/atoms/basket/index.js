import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const productsInBasketState = atom({
  key: "productsInBasketState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default productsInBasketState;
