import { RouteSectionProps, Router, Route } from "@solidjs/router";

import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";

const App = (props: RouteSectionProps<unknown>) => {
  return (
    <BaseLayout>
      <div class="h-full min-h-dvh w-full bg-stone-100">{props.children}</div>
    </BaseLayout>
  );
};

const BaseRouter = () => {
  return (
    <Router root={App}>
      <Route path="/" component={Home} />
    </Router>
  );
};

export default BaseRouter;
