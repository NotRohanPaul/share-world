export const convertBytesToUnits = (totalBytes: number): string => {
    const logOnBase2 = Math.log2(totalBytes);

    if (logOnBase2 < 10) {
        return totalBytes + " B";
    }
    else if (logOnBase2 < 20) {
        totalBytes /= (1024 ** 1);
        return totalBytes.toFixed(2) + " KiB";
    }
    else if (logOnBase2 < 30) {
        totalBytes /= (1024 ** 2);
        return totalBytes.toFixed(2) + " MiB";
    }
    else {
        totalBytes /= (1024 ** 3);
        return totalBytes.toFixed(2) + " GiB";
    }
};