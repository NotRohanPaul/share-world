import { useEffect, useRef, useState } from "react";


export const useMenuOutsideClick = () => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMenuVisible === false) return;

        const handleOutsideClick = (e: globalThis.MouseEvent) => {
            if (
                menuRef.current === null ||
                buttonRef.current === null
            ) return;

            if (buttonRef.current.contains(e.target as Node)) return;

            if (menuRef.current.contains(e.target as Node) === false) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isMenuVisible]);


    return {
        isMenuVisible,
        setIsMenuVisible,
        buttonRef,
        menuRef
    };
};