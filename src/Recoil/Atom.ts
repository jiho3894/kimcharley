import { atom } from "recoil";

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
