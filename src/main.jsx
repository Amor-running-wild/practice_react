import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Checklist from "./SkillsChecklist";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Checklist></Checklist>
  </StrictMode>
);
