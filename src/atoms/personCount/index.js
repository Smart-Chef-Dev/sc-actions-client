import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const personCountState = atom({
  key: "personCountState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export default personCountState;
