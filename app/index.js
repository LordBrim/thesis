import { useState } from "react";

import Root from "./root/Root";
import Authentication from "./authentication/Authentication";

import { SignedInContext } from "../context/SignedInContext";

export default function Main() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <SignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
      {isSignedIn ? <Root /> : <Authentication />}
    </SignedInContext.Provider>
  );
}
