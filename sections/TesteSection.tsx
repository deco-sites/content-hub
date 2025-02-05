import React from "preact/compat";
// import { Button } from "@eluxlab/library-components";

export default function TesteSection() {
  return (
    <div>
      <h2>TesteSection</h2>
      {/* <Button /> */}
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
