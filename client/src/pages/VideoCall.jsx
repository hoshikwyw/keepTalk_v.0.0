import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const VideoCall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = new RTCPeerConnection();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            });

        peerConnection.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate);
            }
        };

        socket.on('offer', async (offer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('answer', answer);
        });

        socket.on('answer', async (answer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('candidate', async (candidate) => {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        return () => {
            peerConnection.close();
        };
    }, []);

    const startCall = async () => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer);
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
            <button onClick={startCall}>Start Call</button>
        </div>
    );
};

export default VideoCall;
