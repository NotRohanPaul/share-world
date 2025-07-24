import { useEffect, type DependencyList } from "react";


export const useDebounce = (
    handler: () => void,
    deps: DependencyList,
    delay: number,
) => {

    useEffect(() => {
        const timerId = setTimeout(() => {
            handler();
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [...deps]);

};