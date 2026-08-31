import React from "react";
import dynamic from "next/dynamic";

const WorldClock = dynamic(() => import("../components/WorldClock"), { ssr: false });

export default function ClockPage() {
  return (
    <main style={{ padding: 20 }}>
      <WorldClock />
    </main>
  );
}
