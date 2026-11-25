"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/** Loads the assistant after the page has finished loading (idle time), so it never competes with the page itself. */
export function ChatLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const start = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      else setTimeout(() => setReady(true), 2000);
    };
    if (document.readyState === "complete") start();
    else {
      window.addEventListener("load", start, { once: true });
      return () => window.removeEventListener("load", start);
    }
  }, []);
  return ready ? <ChatWidget /> : null;
}
