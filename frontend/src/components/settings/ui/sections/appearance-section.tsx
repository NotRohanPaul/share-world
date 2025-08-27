import { RoundedToggleButton } from "@src/components/common/ui/inputs/buttons/rounded-toggle-btn";
import { settingsActions, settingsSelectors } from "@src/redux/slices/settings";
import { useAppDispatch, useAppSelector } from "@src/redux/utils/hooks";
import type { PropsWithChildren } from "react";

const LabelAndValues = ({ labelText, children }: PropsWithChildren<{ labelText: string; }>) => {
    return (
        <div className="flex justify-between items-center gap-2">
            <p className="font-semibold">{labelText}: </p>
            <div className="flex gap-2">
                {children}
            </div>
        </div>
    );
};


export const AppearanceSection = () => {
    const appearanceState = useAppSelector(settingsSelectors.appearance);
    const dispatch = useAppDispatch();

    return (
        <>
            <LabelAndValues labelText="Theme">
                <button>Light</button>
                <button>Dark</button>
            </LabelAndValues>
            <LabelAndValues labelText="Disable animation">
                <RoundedToggleButton isSelected={appearanceState.disableAnimations} onToggle={() => dispatch(settingsActions.appearance.setDisableAnimations(!appearanceState.disableAnimations))} />
            </LabelAndValues>
        </>
    );
};