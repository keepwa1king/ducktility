import { A, AnchorProps, useLocation } from "@solidjs/router";
import { JSX } from "solid-js";

interface LinkProps extends AnchorProps {
  onClick?: () => void;
}

export function Link(props: LinkProps) {
  const location = useLocation();
  const { onClick, ...rest } = props;

  const handleClick: JSX.EventHandlerUnion<HTMLAnchorElement, MouseEvent> = (event) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <A
      state={{ previous: location.pathname }}
      {...rest}
      onclick={(e) => {
        handleClick(e);
        if (rest.onclick) {
          (rest.onclick as any)(e);
        }
      }}
    />
  );
}
