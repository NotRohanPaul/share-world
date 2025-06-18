import { useEffect, useRef, useState } from "react";
import { socketInstance } from "@src/sockets/socket-instance";

export function useSenderWebRTC(peerId: string) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [dataChannelInstance, setDataChannelInstance] = useState<RTCDataChannel | null>(null);


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
        dataChannel.onclose = () => console.log("📤 Data channel closing (sender)");
        dataChannel.onerror = (event) => {
            console.error("Data channel error", event);
        };
        dataChannel.onclose = () => console.log("🛑 Data channel closed");

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                socketInstance.emit("webrtc-ice-candidate-server", { to: peerId, candidate: e.candidate });
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

        // Create offer and send
        (async () => {
            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socketInstance.emit("webrtc-offer-server", { to: peerId, offer });
            }
            catch (err) {
                console.log(err);
            }
        })();

        // Receive answer
        socketInstance.on("webrtc-answer-client", async ({ answer }: { answer: RTCSessionDescriptionInit; }) => {
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
            }
            catch (err) {
                console.log(err);
            }
        });

        socketInstance.on("webrtc-ice-candidate-client", async ({ candidate }: { candidate: RTCIceCandidateInit; }) => {
            try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
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
