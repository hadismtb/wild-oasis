import { useEffect, useRef } from "react";

function UseOutsideClick(handler, listenCapturing = true) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) handler();
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return modalRef;
}

export default UseOutsideClick;
