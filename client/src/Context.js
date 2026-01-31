import React, { createContext, useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);
  const socketRef = useRef(null);

  //Add states for messages
  const [messages, setMessages] = useState([]);

  const setupDataChannel = (peer) => {
    peer.on("data", (data) => {
      const message = data.toString();
      setMessages((prev) => [...prev, { from: "Remote", text: message }]);
    });
  };

  // 1️⃣ Initialize socket ONCE
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected with socket id:", socket.id);
      setMe(socket.id);
    });

    socket.on("callUser", ({ from, name, signal }) => {
      setCall({ isReceivingCall: true, from, name, signal });
    });

    socket.on("end-call", () => {
      cleanUpCall();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 2️⃣ Get user media
  useEffect(() => {
    const getMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);

        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      } catch (err) {
        console.error("Media error:", err);
      }
    };

    getMedia();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("call-ended", () => {
      console.log("Call ended by other user");
      cleanUpCall();
    });

    return () => {
      socketRef.current.off("call-ended");
    };
  }, []);

  // 3️⃣ Answer call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socketRef.current.emit("answerCall", {
        signal: data,
        to: call.from,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    setupDataChannel(peer);

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // 4️⃣ Call a user
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socketRef.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    setupDataChannel(peer);

    socketRef.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const sendMessage = (message) => {
    if (!connectionRef.current) return;

    connectionRef.current.send(message);
    setMessages((prev) => [...prev, { from: "Me", text: message }]);
  };

  // 5️⃣ Proper cleanup (USED BY BOTH USERS)
  const cleanUpCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }

    if (myVideo.current) myVideo.current.srcObject = null;
    if (userVideo.current) userVideo.current.srcObject = null;

    setCall({});
    setCallAccepted(false);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // 6️⃣ Leave call safely
  const leaveCall = () => {
    socketRef.current.emit("end-call");
    cleanUpCall();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        me,
        callUser,
        answerCall,
        leaveCall,
        messages,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
