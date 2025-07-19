
export type ToastOptionsType = {
    id: string,
    text: string,
    exitDelay?: number;
};

type ToastContextOptionsType = Omit<ToastOptionsType, "id">;

export type ToastContextType = (options: ToastContextOptionsType) => void; 