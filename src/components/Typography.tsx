import { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

type TypographyVariant = "title" | "body5" | "body4" | "body3" | "body2" | "body1" | "caption2" | "caption1";

interface TypographyProps {
  variant: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  class?: string;
  children: JSX.Element | string;
  textColor?: string;
}

export default function Typography(props: TypographyProps) {
  const Element = props.as || "p";
  const variantClasses = {
    title: "text-title tracking-title font-bold",
    body5: "text-body5 tracking-body5 font-semibold",
    body4: "text-body4 tracking-body4 font-semibold",
    body3: "text-body3 tracking-body3 font-semibold",
    body2: "text-body2 tracking-body2 font-semibold",
    body1: "text-body1 tracking-body1 font-normal",
    caption2: "text-caption2 tracking-caption2 underline font-normal",
    caption1: "text-caption1 tracking-caption1 font-normal"
  };

  return (
    <Dynamic
      component={Element}
      class={`${variantClasses[props.variant]} ${props.class || ""} ${props.textColor || "text-grey-800"}`}
      style={{ "white-space": "pre-line" }}
    >
      {props.children}
    </Dynamic>
  );
}
