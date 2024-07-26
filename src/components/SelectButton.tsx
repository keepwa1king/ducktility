import { createSignal, createMemo } from "solid-js";
import { items, setItems, state } from "../store"; // Ensure state is correctly imported
import add from "../assets/add_icon.svg";

interface SelectButtonProps {
  index: number;
  userId?: string;
  type: string;
  mode: "edit" | "display";
  question?: string;
}

export default function SelectButton(props: SelectButtonProps) {
  const [imagePreview, setImagePreview] = createSignal<string | null>(null);

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setItems(props.index, {
          ...items[props.index],
          artistMember: {
            profileImage: result,
            name: file.name
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setItems(props.index, "title", target.value);
  };

  const titleClass = createMemo(
    () =>
      `resize-none p-0.5 focus:outline-none border-transparent focus:border-transparent focus:ring-0 placeholder-grey-600 placeholder:text-body1 placeholder:font-normal placeholder:tracking-body1 text-body3 tracking-body3 w-full text-center font-semibold text-grey-800`
  );

  const imageClass = createMemo(
    () => `aspect-square w-full rounded-[4px] flex object-cover object-center aspect-square`
  );

  return (
    <div class="flex w-full flex-col items-center text-center">
      <div class="w-full">
        <label for={`file-input-${props.index}`} class="w-full cursor-pointer">
          {imagePreview() || items[props.index].artistMember ? (
            <img
              class={imageClass()}
              src={imagePreview() || items[props.index].artistMember?.profileImage}
              alt={items[props.index].artistMember?.name || "Selected image"}
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
          id={`file-input-${props.index}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          class="hidden"
        />
      </div>
      <div class="size-2"></div>
      {props.mode === "display" ? (
        <div class="w-full text-center text-body3 font-semibold tracking-body3 text-grey-800">
          <p class="mb-2 font-semibold">{props.question || `${props.index + 1}번째 문항`}</p>
        </div>
      ) : (
        <textarea
          name={`title-input-${props.index}`}
          value={items[props.index].title}
          onInput={handleTitleChange}
          placeholder="항목 이름 입력"
          class={titleClass()}
          rows={2}
          maxLength={16}
        />
      )}
    </div>
  );
}
