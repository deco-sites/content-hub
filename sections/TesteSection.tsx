import React from "preact/compat";

export default function TesteSection() {
  return (
    <div>
      <h2>TesteSection 2</h2>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
