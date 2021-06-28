import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const BasketState = atom({
  key: "BasketState",
  default: {
    personCount: 1,
    order: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default BasketState;
