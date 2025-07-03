export const AppearanceSettings = () => {
    return (
        <>
            <div className="flex justify-between gap-2">
                <label>Theme</label>
                <select
                    name=""
                    id=""
                >
                    <option value="">Light</option>
                    <option value="">Dark</option>

                </select>
            </div>
            <div className="flex justify-between gap-2">
                <label>Animation</label>
                <select name="" id="">
                    <option value="">Enable</option>
                    <option value="">Disable</option>
                </select>
            </div>
        </>
    );
};