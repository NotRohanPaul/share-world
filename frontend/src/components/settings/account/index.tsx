export const AccountSettings = () => {
    return (
        <>
            <div className="flex justify-between">
                <label
                    htmlFor="user-name"
                >
                    Name:
                </label>
                <input
                    className="w-[10rem]"
                    type="text"
                    name="name"
                    defaultValue={"John Doe"}
                    id="user-name"
                />
            </div>
            <div className="flex justify-between">
                <label
                    htmlFor="user-email"
                >
                    Email:
                </label>
                <input
                    className="w-[10rem]"
                    type="text"
                    name="name"
                    defaultValue={"test@test.com"} id="user-email"
                />
            </div>
        </>
    );
};