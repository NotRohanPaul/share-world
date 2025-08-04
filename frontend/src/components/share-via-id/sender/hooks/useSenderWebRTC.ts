import { useEffect, useRef, useState } from "react";
import { shareViaIdSocketInstance } from "@src/sockets/socket-instance";

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
        pc.onsignalingstatechange = () => console.log("Signaling state:", pc.signalingState);
        pc.onconnectionstatechange = () => console.log("Connection state:", pc.connectionState);


        const dataChannel = pc.createDataChannel("fileTransfer", { ordered: true });
        setDataChannelInstance(dataChannel);

        dataChannel.onopen = () => console.log("📤 Data channel open (sender)");
        dataChannel.onclose = () => console.log("🛑 Data channel closed");
        dataChannel.onerror = (event) => {
            console.error("Data channel error", event);
        };

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log("Local ICE candidate:", e.candidate.candidate);
                shareViaIdSocketInstance.emit("webrtc-ice-candidate-server", { to: receiverId, candidate: e.candidate });
            }
            else {
                console.log("All ICE candidates sent");
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log("ICE connection state:", pc.iceConnectionState);
            if (pc.iceConnectionState === "failed") {
                console.error("❌ ICE connection failed");
            }
        };


        pc.onicecandidateerror = (event) => {
            console.error("ICE Candidate Error:", event);
        };

        pc.onicegatheringstatechange = () => {
            console.log("ICE gathering state:", pc.iceGatheringState);
        };

        pc.onnegotiationneeded = () => {
            console.log("Negotiation needed");
        };

        void (async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                shareViaIdSocketInstance.emit("webrtc-offer-server", { to: receiverId, offer });
                console.log({ to: receiverId, offer });
            }
            catch (err) {
                console.log(err);
            }
        })();

        shareViaIdSocketInstance.on("webrtc-answer-client", async ({ answer }: { answer: RTCSessionDescriptionInit; }) => {
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
                remoteDescriptionSet.current = true;

                for (const candidate of iceCandidateQueueRef.current) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
                iceCandidateQueueRef.current = [];
            }
            catch (err) {
                console.log(err);
            }
        });

        shareViaIdSocketInstance.on("webrtc-ice-candidate-client", async ({ candidate }: { candidate: RTCIceCandidateInit; }) => {
            try {
                console.log({ "webrtc-ice-candidate-client": candidate });
                if (remoteDescriptionSet.current === false) {
                    iceCandidateQueueRef.current.push(candidate);
                } else {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (err) {
                console.error("ICE error (sender)", err);
            }
        });

        return () => {
            shareViaIdSocketInstance.off("webrtc-answer-client");
            shareViaIdSocketInstance.off("webrtc-ice-candidate-client");

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
