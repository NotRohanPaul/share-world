import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { useDebounce } from "@src/components/common/hooks/useDebounce";
import { DialogButton } from "@src/components/common/ui/dialog-box/ui/dialog-btn";
import { loginSchema } from "@src/schemas/auth-schemas";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import {
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";


export const SendRequestDialog = () => {
    const [receiverEmail, setReceiverEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<string>('');

    useDebounce(() => {
        if (receiverEmail === "") {
            return void setEmailError('');
        }
        const result = loginSchema.shape.email.safeParse(receiverEmail);
        setEmailError(result.success === true ? '' : result.error.issues[0].message);
    }, [receiverEmail], 600);

    const { mutate: sendRequest } = useMutation({
        mutationFn: apiHandlers.friendRequest.send,
        onSuccess: (res) => {
            if (res.status === 200) {
                setServerResponse("Request Sent Sucessfully");
            }
            else {
                setServerResponse("Something went wrong");
            };
        },
        onError: () => {
            setServerResponse("Network error");
        }
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setServerResponse('');
        setReceiverEmail(e.target.value);
    };

    const handleSendClick = () => {
        setServerResponse('');
        sendRequest({ receiverEmail });
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setServerResponse('');
            sendRequest({ receiverEmail });
        }
    };

    return (
        <section className="h-full flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-2">
                <AnimatePresence mode="wait">
                    {serverResponse !== '' && (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-base text-orange-700 dark:text-orange-500"
                        >
                            {serverResponse}
                        </motion.p>
                    )}
                </AnimatePresence>
                <label
                    htmlFor="receiver-email"
                    className="font-semibold"
                >
                    Enter receiver email
                </label>
                <input
                    autoFocus={true}
                    id="receiver-email"
                    type="email"
                    placeholder="hello@example.com"
                    value={receiverEmail}
                    onChange={handleInput}
                    onKeyDown={handleEnter}
                    className="outline-1 px-2 py-2 outline-gray-500 rounded-sm focus:outline-2 focus:outline-primary placeholder:text-gray-600"
                />
                <AnimatePresence mode="wait">
                    {emailError !== '' && (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-base text-orange-700 dark:text-orange-500"
                        >
                            {emailError}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div className="self-end justify-self-end">
                <DialogButton
                    onClick={handleSendClick}
                >
                    Send
                </DialogButton>
            </div>
        </section>
    );
};