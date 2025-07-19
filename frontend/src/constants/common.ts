const currentDeviceType = (): "mobile" | "desktop" | "unknown" => {
    const type = "unknown";
    const userAgent = navigator.userAgent;

    if (userAgent === "") return type;

    const isMobile = [
        /android/i,
        /mobile/i,
        /iphone/i,
        /ipad/i
    ].some((regex) => regex.test(userAgent));
    if (isMobile === true) return "mobile";

    const isDesktop = [
        /windows/i,
        /mac/i,
        /linux/i
    ].some((regex) => regex.test(userAgent));
    if (isDesktop === true) return "desktop";


    return type;
};

export const CURRENT_DEVICE_TYPE = currentDeviceType();
export const IS_TOUCH_DEVICE = "ontouchstart" in window || navigator.maxTouchPoints > 0;
