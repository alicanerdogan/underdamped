import * as React from "react";
import * as ReactDOM from "react-dom";
const App = React.lazy(() => import(/* webpackChunkName: 'App' */ "./App"));

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
