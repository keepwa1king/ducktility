import { ParentComponent } from "solid-js";

export const AppGrid: ParentComponent = (props) => {
  return <div class="grid-cols-app gap-x-app-gutter px-app-gutter grid">{props.children}</div>;
};

export const GridColumn: ParentComponent<{ span?: 1 | 2 | 3 | 4 | 5 }> = (props) => {
  const spanClass = props.span ? `col-span-${props.span}` : "";
  return <div class={`${spanClass}`}>{props.children}</div>;
};
