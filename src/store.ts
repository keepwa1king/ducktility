// store.ts
import { createStore } from "solid-js/store";
import { Answer, User } from "./types";

export interface ItemState {
  title: string;
  artistMember: {
    profileImage: string;
    name: string;
  } | null;
}

export interface ItemsStore {
  [key: number]: ItemState;
}

const initialItems: ItemsStore = Object.fromEntries(
  Array(9)
    .fill(0)
    .map((_, index) => [index, { title: "", artistMember: null }])
);

const [items, setItems] = createStore<ItemsStore>(initialItems);

const [answers, setAnswers] = createStore<Answer[]>([]);

export { items, setItems, answers, setAnswers };

interface StoreState {
  questions: string[];
  users: User[];
}

const [state, setState] = createStore<StoreState>({
  questions: Array(9).fill(""),
  users: [
    {
      name: "",
      profileImage: null,
      answers: Array(9).fill({ profileImage: "" })
    },
    {
      name: "",
      profileImage: null,
      answers: Array(9).fill({ profileImage: "" })
    }
  ]
});

export { state, setState };

export const setQuestion = (index: number, value: string) => {
  setState("questions", index, value);
};

export const addUser = () => {
  setState("users", (users) => [
    ...users,
    { name: "", profileImage: null, answers: Array(9).fill({ profileImage: "" }) }
  ]);
};

export const updateUser = (userIndex: number, newData: Partial<User>) => {
  setState("users", userIndex, (user) => ({ ...user, ...newData }));
};

export const setUserAnswer = (userIndex: number, answerIndex: number, answer: Answer) => {
  setState("users", userIndex, "answers", answerIndex, answer);
};
