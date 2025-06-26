import { useEffect, useRef, useState } from "react";
import { socketInstance } from "@src/sockets/socket-instance";
import { appLogger } from "@src/utils/common";

export function useReceiverWebRTC(peerId: string | null) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
    const iceCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);
    const remoteDescriptionSet = useRef<boolean>(false);

    useEffect(() => {
        if (peerId === null || pcRef.current !== null) return;

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        pcRef.current = pc;
        pc.onsignalingstatechange = () => appLogger.log("Signaling state:", pc.signalingState);
        pc.onconnectionstatechange = () => appLogger.log("Connection state:", pc.connectionState);


        pc.ondatachannel = (event) => {
            const channel = event.channel;
            setDataChannel(channel);
            appLogger.log("📥 Data channel open (receiver)");
            channel.onerror = (event) => {
                appLogger.error("Data channel error", event);
            };
            channel.onclose = () => appLogger.log("🛑 Data channel closed (receiver)");
        };

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                appLogger.log("Local ICE candidate:", e.candidate.candidate);
                socketInstance.emit("webrtc-ice-candidate-server", { to: peerId, candidate: e.candidate });
            }
            else {
                appLogger.log("All ICE candidates sent");
            }
        };

        pc.onicegatheringstatechange = () => {
            appLogger.log("ICE gathering state:", pc.iceGatheringState);
        };

        pc.onnegotiationneeded = () => {
            appLogger.log("Negotiation needed");
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

        socketInstance.on("webrtc-offer-client", async ({
            offer
        }: {
            offer: RTCSessionDescriptionInit;
        }) => {
            try {
                appLogger.log("Receiver: ", { offer });
                await pc.setRemoteDescription(new RTCSessionDescription(offer));

                remoteDescriptionSet.current = true;
                for (const candidate of iceCandidateQueueRef.current) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
                iceCandidateQueueRef.current = [];

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socketInstance.emit("webrtc-answer-server", { to: peerId, answer });
            }
            catch (err) {
                appLogger.log(err);
            }
        });

        socketInstance.on("webrtc-ice-candidate-client", async ({ candidate }) => {
            try {
                appLogger.log("Receiver ICE candidate: ", new RTCIceCandidate(candidate));
                if (remoteDescriptionSet.current === false) {
                    iceCandidateQueueRef.current.push(candidate);
                } else {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (err) {
                appLogger.error("ICE error (receiver)", err);
            }
        });

        return () => {
            socketInstance.off("webrtc-offer-client");
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
        };
    }, [peerId]);

    return { dataChannel };
}
