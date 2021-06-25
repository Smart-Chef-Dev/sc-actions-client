import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const UserDataState = atom({
  key: "UserDataState",
  default: {
    jwt: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default UserDataState;
