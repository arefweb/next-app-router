"use client";

import { useState } from "react";

function DevButton() {
  const [restarting, setRestarting] = useState(false);
  if (process.env.NODE_ENV !== "development") return null;

  const restartServer = async () => {
    setRestarting(true);
    await fetch("/api/restart");

    // Poll server every 1s to check when it's back
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/", { cache: "no-store" });
        if (res.ok) {
          clearInterval(interval);
          window.location.reload();
        }
      } catch {
        // server is still down, keep polling
      }
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={restartServer}
      disabled={restarting}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        padding: "0.5rem 0.75rem",
        fontSize: "0.9rem",
        backgroundColor: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: restarting ? "not-allowed" : "pointer",
        opacity: 0.8,
      }}
    >
      <span className="relative group">
        {restarting ? <>🛠</> : <>🔄</>}
        <i className="absolute left-[-0.9rem] top-[-3rem] hidden group-hover:inline-block
        text-sm text-gray-600 bg-orange-300">
          Restart Next.js
        </i>
      </span>
    </button>
  );
}

export default DevButton;
