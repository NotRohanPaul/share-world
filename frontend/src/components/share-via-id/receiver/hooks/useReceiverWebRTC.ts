import { useEffect, useRef, useState } from "react";
import { shareViaIdSocketInstance } from "@src/sockets/socket-instance";

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
        pc.onsignalingstatechange = () => console.log("Signaling state:", pc.signalingState);
        pc.onconnectionstatechange = () => console.log("Connection state:", pc.connectionState);


        pc.ondatachannel = (event) => {
            const channel = event.channel;
            setDataChannel(channel);
            console.log("📥 Data channel open (receiver)");
            channel.onerror = (event) => {
                console.error("Data channel error", event);
            };
            channel.onclose = () => console.log("🛑 Data channel closed (receiver)");
        };

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log("Local ICE candidate:", e.candidate.candidate);
                shareViaIdSocketInstance.emit("webrtc-ice-candidate-server", { to: peerId, candidate: e.candidate });
            }
            else {
                console.log("All ICE candidates sent");
            }
        };

        pc.onicegatheringstatechange = () => {
            console.log("ICE gathering state:", pc.iceGatheringState);
        };

        pc.onnegotiationneeded = () => {
            console.log("Negotiation needed");
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

        shareViaIdSocketInstance.on("webrtc-offer-client", async ({
            offer
        }: {
            offer: RTCSessionDescriptionInit;
        }) => {
            try {
                console.log("Receiver: ", { offer });
                await pc.setRemoteDescription(new RTCSessionDescription(offer));

                remoteDescriptionSet.current = true;
                for (const candidate of iceCandidateQueueRef.current) {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
                iceCandidateQueueRef.current = [];

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                shareViaIdSocketInstance.emit("webrtc-answer-server", { to: peerId, answer });
            }
            catch (err) {
                console.log(err);
            }
        });

        shareViaIdSocketInstance.on("webrtc-ice-candidate-client", async ({ candidate }) => {
            try {
                console.log("Receiver ICE candidate: ", new RTCIceCandidate(candidate));
                if (remoteDescriptionSet.current === false) {
                    iceCandidateQueueRef.current.push(candidate);
                } else {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (err) {
                console.error("ICE error (receiver)", err);
            }
        });

        return () => {
            shareViaIdSocketInstance.off("webrtc-offer-client");
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
        };
    }, [peerId]);

    return { dataChannel };
}
