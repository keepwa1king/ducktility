import { For } from "solid-js";

const MultiLineText = (props: { text: string; class?: string }) => (
  <For each={props.text.split("\\n")}>
    {(line, index) => (
      <>
        {index() > 0 && <br />}
        <span class={props.class}>{line}</span>
      </>
    )}
  </For>
);

export default MultiLineText;
