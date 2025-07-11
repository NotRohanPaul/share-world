
export type ToastOptionsType = {
    id: string,
    text: string,
};

type ToastContextOptionsType = Omit<ToastOptionsType, "id">;

export type ToastContextType = (options: ToastContextOptionsType) => void; 