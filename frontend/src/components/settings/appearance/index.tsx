export const AppearanceSettings = () => {
    return (
        <>
            <div className="flex gap-2">
                <label>Theme</label>
                <select
                    className="w-[5rem] text-end"
                    name=""
                    id=""
                >
                    <option value="">Light</option>
                    <option value="">Dark</option>

                </select>
            </div>
            <div className="flex gap-2">
                <label>Animation</label>
                <select
                    className="w-[5rem] text-end"
                    name=""
                    id=""
                >
                    <option value="">Enable</option>
                    <option value="">Disable</option>
                </select>
            </div>
        </>
    );
};