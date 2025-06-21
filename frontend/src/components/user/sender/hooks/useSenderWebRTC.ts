import { useEffect, useRef, useState } from "react";
import { socketInstance } from "@src/sockets/socket-instance";

export function useSenderWebRTC(peerId: string) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [dataChannelInstance, setDataChannelInstance] = useState<RTCDataChannel | null>(null);
    const iceCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);
    let remoteDescriptionSet = false;


    useEffect(() => {
        if (!peerId || pcRef.current) return;
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        pcRef.current = pc;
        pc.onsignalingstatechange = () => console.log("Signaling state:", pc.signalingState);
        pc.onconnectionstatechange = () => console.log("Connection state:", pc.connectionState);


        const dataChannel = pc.createDataChannel("fileTransfer");
        setDataChannelInstance(dataChannel);

        dataChannel.onopen = () => console.log("📤 Data channel open (sender)");
        dataChannel.onclose = () => console.log("🛑 Data channel closed");
        dataChannel.onerror = (event) => {
            console.error("Data channel error", event);
        };

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log("Local ICE candidate:", e.candidate.candidate);
                socketInstance.emit("webrtc-ice-candidate-server", { to: peerId, candidate: e.candidate });
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

        // Create offer and send
        (async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socketInstance.emit("webrtc-offer-server", { to: peerId, offer });
                console.log({ to: peerId, offer });
            }
            catch (err) {
                console.log(err);
            }
        })();

        // Receive answer
        socketInstance.on("webrtc-answer-client", async ({ answer }: { answer: RTCSessionDescriptionInit; }) => {
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
                remoteDescriptionSet = true;

                for (const candidate of iceCandidateQueueRef.current) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
                iceCandidateQueueRef.current = [];
            }
            catch (err) {
                console.log(err);
            }
        });

        socketInstance.on("webrtc-ice-candidate-client", async ({ candidate }: { candidate: RTCIceCandidateInit; }) => {
            try {
                console.log({ "webrtc-ice-candidate-client": candidate });
                if (!remoteDescriptionSet) {
                    iceCandidateQueueRef.current.push(candidate);
                } else {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (err) {
                console.error("ICE error (sender)", err);
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
    }, [peerId]);

    return { dataChannel: dataChannelInstance };
}
