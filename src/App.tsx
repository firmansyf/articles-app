import "./App.css";
import { lazy } from "react";

const Router = lazy(() =>
  import("./routes").then((module) => ({ default: module.Router }))
);

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
