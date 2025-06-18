import { useState } from "react";
import { Signin } from "./UserSignin";
import { Signup } from "./UserSignup";

export const Main = () => {
  const [mode, setMode] = useState("signin");

  return (
    <div
      className=""
      style={{
        height: "100vh",
      }}
    >
      {mode === "signin" && <Signin setMode={setMode} />}
      {mode === "signup" && <Signup setMode={setMode} />}
    </div>
  );
};
