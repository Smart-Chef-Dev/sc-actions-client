import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const personState = atom({
  key: "personState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export default personState;
