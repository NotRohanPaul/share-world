import { RoundedToggleButton } from "@src/components/common/ui/inputs/buttons/rounded-toggle-btn";
import { settingsActions, settingsSelectors } from "@src/redux/slices/settings";
import type { AppearanceStateType } from "@src/redux/slices/settings/appearance-slice";
import { useAppDispatch, useAppSelector } from "@src/redux/utils/hooks";
import type { MouseEvent, PropsWithChildren } from "react";

const LabelAndValues = ({ labelText, children }: PropsWithChildren<{ labelText: string; }>) => {
    return (
        <div className="flex justify-between items-center gap-2">
            <p className="font-semibold">{labelText}: </p>
            {children}
        </div>
    );
};


export const AppearanceSection = () => {
    const appearanceState = useAppSelector(settingsSelectors.appearance);
    const dispatch = useAppDispatch();

    const handleThemeBtnClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON") return;

        if (["light", "dark"].includes(target.value) === false) return;

        dispatch(settingsActions.appearance.setTheme(target.value as AppearanceStateType["theme"]));
    };

    return (
        <>
            <LabelAndValues labelText="Theme">
                <div
                    className="flex p-0.5 rounded-full border-2 border-gray-500 overflow-hidden"
                    onClick={handleThemeBtnClick}
                >
                    {
                        ["Light", "Dark"].map((text) => {
                            return (<button
                                key={text}
                                className={
                                    "w-[100px] h-[40px] max-xs:w-[60px] max-xs:h-[25px] flex items-center justify-center font-semibold text-xl max-xs:text-base " +
                                    `${text.toLowerCase() === appearanceState.theme ?
                                        "cursor-auto bg-primary text-white" :
                                        "hover:text-primary hover:bg-blue-200"
                                    } ` +
                                    "first:rounded-l-full last:rounded-r-full"
                                }
                                value={text.toLowerCase()}
                            >
                                {text}
                            </button>);
                        })
                    }
                </div>
            </LabelAndValues >
            <LabelAndValues labelText="Disable animation">
                <RoundedToggleButton isSelected={appearanceState.disableAnimations} onToggle={() => dispatch(settingsActions.appearance.setDisableAnimations(!appearanceState.disableAnimations))} />
            </LabelAndValues>
        </>
    );
};
