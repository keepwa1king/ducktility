import { RouteSectionProps, Router, Route } from "@solidjs/router";

import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Multiple from "../pages/Multiple";
import Result from "../pages/Result";
import Single from "../pages/Single";
import MultipleResult from "../pages/MultipleResult";

const App = (props: RouteSectionProps<unknown>) => {
  return (
    <BaseLayout>
      <div class="h-full min-h-dvh w-full bg-white">{props.children}</div>
    </BaseLayout>
  );
};

const BaseRouter = () => {
  return (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/collage/type/single" component={Single} />
      <Route path="/collage/type/multiple" component={Multiple} />
      <Route path="/collage/type/result" component={Result} />
      <Route path="/collage/type/multipleresult" component={MultipleResult} />
    </Router>
  );
};

export default BaseRouter;
