import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

export function useIsDesktop() {
  const isDesktop = useSignal(false);

  useEffect(() => {
    if (typeof globalThis === "undefined") return; 

    const checkIfDesktop = () => {
      isDesktop.value = globalThis.innerWidth >= 1024;
    };

    checkIfDesktop();
    globalThis.addEventListener("resize", checkIfDesktop);

    return () => globalThis.removeEventListener("resize", checkIfDesktop);
  }, []);

  return isDesktop;
}