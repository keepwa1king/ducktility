import Typography from "./Typography";

type ButtonVariant = "unactive" | "active" | "point";

interface ButtonProps {
  variant: ButtonVariant;
  children: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const variantClasses = {
    unactive: "bg-grey-200",
    active: "bg-grey-800",
    point: "bg-ourBlue"
  };

  return (
    <button class={`fixed bottom-0 left-0 right-0 mx-auto my-12 max-w-app`} onClick={props.onClick}>
      <span
        class={`${variantClasses[props.variant]} mx-5 flex h-12 flex-col items-center justify-center rounded-lg px-9 py-4 text-base font-semibold leading-[18px] tracking-[-0.1px] text-white`}
      >
        {props.children}
      </span>
    </button>
  );
}
