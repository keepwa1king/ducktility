import { children, JSX } from "solid-js";

interface ContentLayoutProps {
  children: JSX.Element;
  backgroundColor?: string;
}

export default function ContentLayout(props: ContentLayoutProps) {
  const className = `h-dvh w-full ${props.backgroundColor ?? "bg-white"}`;

  return <div class={className}>{props.children}</div>;
}
