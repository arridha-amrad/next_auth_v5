"use client";

import { useSession } from "next-auth/react";

function TestClientComp() {
  const session = useSession();
  console.log(session.data?.user);

  return <div>Test</div>;
}

export default TestClientComp;
