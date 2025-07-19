export const AccountSettings = () => {
    return (
        <>
            <div className="flex gap-2">
                <label
                    htmlFor="user-name"
                >
                    Name:
                </label>
                <input
                    className="w-full"
                    type="text"
                    name="name"
                    defaultValue={"John Doe"}
                    id="user-name"
                />
            </div>
            <div className="flex gap-2">
                <label
                    htmlFor="user-email"
                >
                    Email:
                </label>
                <input
                    className="w-full"
                    type="text"
                    name="name"
                    defaultValue={"test@test.com"} id="user-email"
                />
            </div>
        </>
    );
};