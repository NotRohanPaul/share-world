import { authSelectors } from "@src/redux/slices/auth";
import { useAppSelector } from "@src/redux/utils/hooks";

const LabelAndValue = ({
    labelText,
    valueText
}: {
    labelText: string,
    valueText: string;
}) => {
    return (
        <div className="flex gap-2">
            <p className="font-semibold">
                {labelText}:
            </p>
            <p className="break-all">
                {valueText}
            </p>
        </div>
    );
};

export const AccountSettings = () => {
    const userState = useAppSelector(authSelectors.user);

    return (
        <>
            <LabelAndValue
                labelText="Name"
                valueText={
                    userState.type === "auth-user" ?
                        userState.name :
                        "Guest"
                }
            />
            {
                userState.type === "auth-user" &&
                <LabelAndValue
                    labelText="Email"
                    valueText={userState.email}
                />
            }
        </>
    );
};