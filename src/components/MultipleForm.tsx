import { createSignal, For, createEffect } from "solid-js";
import { createStore, produce } from "solid-js/store";
import TextInput from "./TextInput";
import UserForm from "./UserForm";
import Typography from "./Typography";
import { User } from "../types";
import { state, setState, updateUser } from "../store";

export default function MultipleForm() {
  const updateQuestion = (index: number, value: string) => {
    const updatedQuestions = state.questions.map((question, i) => (i === index ? value : question));

    setState("questions", updatedQuestions);
  };

  const exampleTexts = ["최애", "차애", "친구", "애인", "결혼", "이혼", "성격", "육아", "이상형"];

  return (
    <div class="flex w-full flex-col gap-4">
      <Typography variant="title" textColor="text-grey-800">
        취향표 문항을 입력해 주세요
        <br />
      </Typography>
      <div class="grid w-full grid-cols-2 gap-1">
        <For each={state.questions}>
          {(question, index) => (
            <TextInput index={index()} value={question} onChange={(value) => updateQuestion(index(), value)} exampleText={exampleTexts[index()]} />
          )}
        </For>
      </div>
      <div class="size-4"></div>
      {state.questions.every((question) => question !== "") ? (
        <div class="flex w-full flex-col">
          <Typography variant="title" textColor="text-grey-800">
            취향표를 채워 주세요.
            <br />
          </Typography>
          <div class="size-4"></div>
          <For each={state.users}>
            {(user, index) => <UserForm questions={state.questions} userIndex={index()} user={user} />}
          </For>
        </div>
      ) : null}
    </div>
  );
}
