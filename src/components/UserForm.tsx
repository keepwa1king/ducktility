import { createSignal, createUniqueId, For } from "solid-js";
import { state, updateUser } from "../store"; // Ensure correct import
import edit from "../assets/edit.svg";
import img from "../assets/img.svg";
import MultipleButton from "./MultipleButton";
import { User } from "../types";

interface UserFormProps {
  questions: string[];
  userIndex: number;
  user: User;
}

export default function UserForm(props: UserFormProps) {
  const user = () => state.users[props.userIndex]; // Ensure state access is correct

  const handleNameChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    updateUser(props.userIndex, { name: target.value });
  };

  const [imagePreview, setImagePreview] = createSignal<string | null>(null);

  const handleProfileImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;

        updateUser(props.userIndex, {
          profileImage: result
        });

        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="mb-14 w-full">
      <div class="flex items-center">
        <label class="cursor-pointer">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-grey-50">
            {imagePreview() ? (
              <img src={user().profileImage ?? ""} alt="프로필" class="h-full w-full rounded-full object-cover" />
            ) : (
              <img src={img} alt="프로필 추가" class="h-6 w-6" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleProfileImageChange} class="hidden" />
        </label>
        <div class="size-2"></div>
        <div class="flex flex-row items-center rounded-[4px] bg-grey-50 px-3 py-[6px]">
          <input
            size={14}
            type="text"
            value={user().name}
            onInput={handleNameChange}
            placeholder="이름을 입력하세요"
            class="rounded-[4px] border-transparent bg-grey-50 p-0 text-body1 font-semibold tracking-body1 text-grey-800 placeholder-grey-400 placeholder:text-body1 placeholder:font-normal placeholder:tracking-body1 focus:border-transparent focus:outline-none focus:ring-0"
            maxLength={10}
          />
          <img src={edit} alt="icon" class="h-4 w-4" />
        </div>
      </div>
      <div class="mt-6 grid grid-cols-4 gap-4">
        <For each={props.questions}>
          {(_, index) => {
            const uuid = createUniqueId();
            return (
              <div class="flex w-full flex-col text-center">
                <MultipleButton userIndex={props.userIndex} index={index()} user={user()} uid={uuid} />
                <div class="size-2"></div>
                <div class="w-full text-center text-body3 font-semibold tracking-body3 text-grey-800">
                  {props.questions[index()] || `${index() + 1}번째 문항`}
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
