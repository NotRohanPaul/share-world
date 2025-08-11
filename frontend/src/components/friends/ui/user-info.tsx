import { AppIcons } from "@src/assets/icons";

export const UserInfo = ({
    data
}: {
    data: Record<string, string>[];
}) => {
    console.log(data);
    return (
        <>
            {
                data.map(({ name }) => {
                    return (
                        <div key={name} className="flex gap-2 p-2 bg-secondary">
                            <AppIcons.Avatar className="text-white" />
                            <p className="w-full">
                                name
                            </p>
                            ...
                        </div>
                    );
                })
            }
        </>
    );
};