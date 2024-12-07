import { useEffect, useRef } from "react";

export function useClickOutside(action) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          action();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [action]
  );

  return ref;
}
