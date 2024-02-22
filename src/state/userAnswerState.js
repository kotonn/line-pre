import { atom } from "recoil";

export const userAnswerState = atom({
  key: "userAnswerState",
  default: {
    firstAnswer: null,
    secondAnswer: null,
    thirdAnswer: null,
    fourthAnswer: null,
    fifthAnswer: null,
  },
});
