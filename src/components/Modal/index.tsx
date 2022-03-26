import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

type Props = {
    children: React.ReactNode,
};

function Modal({ children }: Props) {
    const elRef: React.MutableRefObject<Element> = useRef(document.createElement("div"));

    useEffect(() => {
        modalRoot.appendChild(elRef.current);
        // unmounting
        return function removeChildFromModalRoot() {
            modalRoot.removeChild(elRef.current);
        };
    }, [])

    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;
