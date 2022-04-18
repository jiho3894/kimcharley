import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export enum SoundEnums {
  OFF = "0",
  ON = "1",
}

const { OFF, ON } = SoundEnums;

export const getSound = (): SoundEnums => {
  const sound = localStorage.getItem("sound");
  if (sound === OFF) {
    return OFF;
  }
  return ON;
};

export const isSoundAtom = atom<SoundEnums>({
  key: "soundMode",
  default: getSound(),
});

export const gitID = atom({
  key: "GIT",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const getUpcomingImg = atom({
  key: "UpcomingImg",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const getTvImg = atom({
  key: "TvImg",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
