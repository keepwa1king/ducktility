import { createSignal, onMount, createEffect } from "solid-js";
import { debounce } from "../utils/debounce";
import edit from "../assets/edit.svg";

interface TextInputProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput(props: TextInputProps) {
  let inputRef: HTMLInputElement | undefined;
  const [localValue, setLocalValue] = createSignal(props.value);
  const [isTyping, setIsTyping] = createSignal(false);

  createEffect(() => {
    setLocalValue(props.value);
    // console.log(`Effect: props.value changed to ${props.value}`);
  });

  onMount(() => {
    if (inputRef) {
      inputRef.value = props.value;
      // console.log(`Mounted: inputRef value set to ${props.value}`);
    }
  });

  const debouncedOnChange = debounce(() => {
    if (!isTyping()) {
      props.onChange(localValue());
    }
  }, 700);

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setLocalValue(target.value);
    setIsTyping(true);
    debouncedOnChange();
  };

  const handleBlur = () => {
    setIsTyping(false);
    props.onChange(localValue());
  };

  const handleCompositionEnd = () => {
    setIsTyping(false);
    debouncedOnChange();
  };

  return (
    <div class="flex flex-row items-center rounded-[4px] bg-grey-50 px-3 py-[6px]">
      <input
        size={15}
        type="text"
        ref={inputRef}
        value={localValue()}
        onInput={handleInput}
        onBlur={handleBlur}
        onCompositionEnd={handleCompositionEnd}
        placeholder={`${props.index + 1}번째 문항 ex) 최애`}
        name={`question-${props.index}`}
        id={`question-${props.index}`}
        aria-label={`${props.index + 1}번째 문항`}
        class="rounded-[4px] border-transparent bg-grey-50 p-0 text-body1 font-semibold tracking-body1 text-grey-800 placeholder-grey-400 placeholder:text-body1 placeholder:font-normal placeholder:tracking-body1 focus:border-transparent focus:outline-none focus:ring-0"
        maxLength={16}
      />
      <img src={edit} alt="icon" class="h-4 w-4" />
    </div>
  );
}
