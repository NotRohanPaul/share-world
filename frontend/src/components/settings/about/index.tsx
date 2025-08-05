import { AppImages } from "@src/assets/images";
import axios from "axios";
import { useEffect, useState } from "react";

const MetaInfoPara = ({ title, value }: { title: string, value: string | undefined; }) => {
    return (
        <>
            {
                value !== undefined &&
                <p className="flex whitespace-nowrap gap-1">
                    <span className="font-bold">
                        {title}:
                    </span>
                    <span className="text-wrap break-all">
                        {value}
                    </span>
                </p>
            }
        </>
    );
};

export const AboutSettings = () => {
    const [metaInfo, setMetaInfo] = useState<Record<string, string | undefined> | null>(null);

    useEffect(() => {
        void axios.get('/meta-frontend.json')
            .then((res) => setMetaInfo(res.data));
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <div className="flex flex-col items-center">
                <AppImages.ShareWorldFade className={"w-[5rem] h-[5rem] max-xs:w-[3rem] max-xs:h-[3rem] aspect-square object-center object-contain p-1 bg-white rounded-full outline-2 outline-primary"}
                />
                <p className="text-3xl max-xs:text-xl font-semibold">Share World</p>
            </div>
            {
                metaInfo !== null &&
                <div className="flex flex-col gap-2">
                    <MetaInfoPara title="Version" value={metaInfo.version} />
                    <MetaInfoPara title="Build Number" value={metaInfo.buildNumber} />
                    <MetaInfoPara title="Build Date" value={metaInfo.timestamp} />
                </div>
            }

        </div>
    );
};