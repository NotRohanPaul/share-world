import { useEffect, useRef, useState } from "react";
import { socketInstance } from "@src/sockets/socket-instance";
import { appLogger } from "@src/utils/common";

export function useSenderWebRTC(receiverId: string | null) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [dataChannelInstance, setDataChannelInstance] = useState<RTCDataChannel | null>(null);
    const iceCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);
    const remoteDescriptionSet = useRef<boolean>(false);


    useEffect(() => {
        if (receiverId === null || pcRef.current) return;
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        pcRef.current = pc;
        pc.onsignalingstatechange = () => appLogger.log("Signaling state:", pc.signalingState);
        pc.onconnectionstatechange = () => appLogger.log("Connection state:", pc.connectionState);


        const dataChannel = pc.createDataChannel("fileTransfer");
        setDataChannelInstance(dataChannel);

        dataChannel.onopen = () => appLogger.log("📤 Data channel open (sender)");
        dataChannel.onclose = () => appLogger.log("🛑 Data channel closed");
        dataChannel.onerror = (event) => {
            appLogger.error("Data channel error", event);
        };

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                appLogger.log("Local ICE candidate:", e.candidate.candidate);
                socketInstance.emit("webrtc-ice-candidate-server", { to: receiverId, candidate: e.candidate });
            }
            else {
                appLogger.log("All ICE candidates sent");
            }
        };

        pc.oniceconnectionstatechange = () => {
            appLogger.log("ICE connection state:", pc.iceConnectionState);
            if (pc.iceConnectionState === "failed") {
                appLogger.error("❌ ICE connection failed");
            }
        };


        pc.onicecandidateerror = (event) => {
            appLogger.error("ICE Candidate Error:", event);
        };

        pc.onicegatheringstatechange = () => {
            appLogger.log("ICE gathering state:", pc.iceGatheringState);
        };

        pc.onnegotiationneeded = () => {
            appLogger.log("Negotiation needed");
        };

        void (async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socketInstance.emit("webrtc-offer-server", { to: receiverId, offer });
                appLogger.log({ to: receiverId, offer });
            }
            catch (err) {
                appLogger.log(err);
            }
        })();

        socketInstance.on("webrtc-answer-client", async ({ answer }: { answer: RTCSessionDescriptionInit; }) => {
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
                remoteDescriptionSet.current = true;

                for (const candidate of iceCandidateQueueRef.current) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
                iceCandidateQueueRef.current = [];
            }
            catch (err) {
                appLogger.log(err);
            }
        });

        socketInstance.on("webrtc-ice-candidate-client", async ({ candidate }: { candidate: RTCIceCandidateInit; }) => {
            try {
                appLogger.log({ "webrtc-ice-candidate-client": candidate });
                if (remoteDescriptionSet.current === false) {
                    iceCandidateQueueRef.current.push(candidate);
                } else {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (err) {
                appLogger.error("ICE error (sender)", err);
            }
        });

        return () => {
            socketInstance.off("webrtc-answer-client");
            socketInstance.off("webrtc-ice-candidate-client");

            if (pcRef.current) {
                pcRef.current.onicecandidate = null;
                pcRef.current.ondatachannel = null;
                if (pcRef.current.connectionState !== "closed") {
                    pcRef.current.close();
                }
                pcRef.current = null;
            }

            if (dataChannel && dataChannel.readyState !== "closed") {
                dataChannel.close();
            }
            setDataChannelInstance(null);
        };
    }, [receiverId]);

    return { dataChannel: dataChannelInstance };
}
