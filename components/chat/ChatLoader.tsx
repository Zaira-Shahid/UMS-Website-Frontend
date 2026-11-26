"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { whenReady } from "@/lib/hydration-gate";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/** Loads the assistant on the first scroll, tap or key press, or a few seconds after the page has loaded, so it never competes with the page itself. */
export function ChatLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    whenReady().then(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);
  return ready ? <ChatWidget /> : null;
}
