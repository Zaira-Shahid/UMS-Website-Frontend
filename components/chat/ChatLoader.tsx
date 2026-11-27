"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { whenInteracted } from "@/lib/hydration-gate";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/** Loads the assistant on the first scroll, tap, mouse move or key press (never on a timer), so it never competes with the page itself. */
export function ChatLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    whenInteracted().then(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);
  return ready ? <ChatWidget /> : null;
}
