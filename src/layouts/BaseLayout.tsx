import { children, JSX } from "solid-js";

interface BaseLayoutProps {
  children: JSX.Element;
}

export default function BaseLayout(props: BaseLayoutProps) {
  return (
    <div class="flex min-h-dvh items-center justify-center bg-gray-100">
      <div class="max-w-app w-full">{props.children}</div>
    </div>
  );
}
