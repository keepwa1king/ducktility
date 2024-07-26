import { createSignal, createMemo, createUniqueId } from "solid-js";
import { setUserAnswer, state, updateUser } from "../store";
import add from "../assets/add_icon.svg";
import { Answer, User } from "../types";

interface MultipleButtonProps {
  index: number;
  userIndex: number;
  user: User;
  uid: string;
}

export default function MultipleButton(props: MultipleButtonProps) {
  const [imagePreview, setImagePreview] = createSignal<string | null>(null);

  const user = () => state.users[props.userIndex]; // Ensure state access is correct

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;

        const updatedAnswers = user().answers.map((answer, index) => ({
          ...answer,
          profileImage: index === props.index ? result : answer.profileImage
        }));

        updateUser(props.userIndex, {
          answers: updatedAnswers
        });

        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageClass = createMemo(
    () => `aspect-square w-full rounded-[4px] flex object-cover object-center aspect-square`
  );

  return (
    <div class="w-full">
      <label
        for={`file-input-${props.index}-multiple-user-${props.userIndex}-${props.uid}`}
        class="w-full cursor-pointer"
      >
        {imagePreview() ? (
          <img
            class={imageClass()}
            src={user().answers[props.index]?.profileImage ?? ""}
            alt={"Selected image"}
            width={120}
            height={120}
          />
        ) : (
          <div class="flex aspect-square w-full flex-col items-center justify-center rounded-[4px] bg-grey-50">
            <img src={add} alt="add" class="h-7" />
          </div>
        )}
      </label>
      <input
        id={`file-input-${props.index}-multiple-user-${props.userIndex}-${props.uid}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        class="hidden"
      />
    </div>
  );
}
