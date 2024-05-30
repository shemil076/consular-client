import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

const WebcamCapture = ({ isModalOpen, closeCamModal, setCapturedImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [needToClose, setNeedToClose] = useState(true);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    if (isModalOpen) {
      startWebcam();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isModalOpen]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const image = canvasRef.current.toDataURL("image/png");
      setCapturedImage(image);
    }
    closeModal();
  };

  const closeModal = () => {
    setNeedToClose(false);
    console.log(`this is to check the value of isOpenModal, ${isModalOpen}`);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (!needToClose) {
      closeCamModal(false);
    }
  }, [needToClose]);

  return (
    <div>
      <div className="modal-overlay">
        <div style={{ position: "relative" }}>
          <video
            ref={videoRef}
            width="640"
            height="480"
            autoPlay
            style={{ transform: "scaleX(-1)" }}
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          />
          {/* Top-left corner */}
          <div className="modal-top-left-boundary"/>
          {/* Top-right corner */}
          <div className="modal-top-right-boundary"/>
          {/* Bottom-left corner */}
          <div className="modal-bottom-left-boundary"/>
          {/* Bottom-right corner */}
          <div className="modal-bottom-right-boundary"/>

          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
              padding: "5px 10px",
              background: "rgba(255,255,255,0.2)",
              border: "1px solid #ccc",
              borderRadius: "100%",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => closeModal()}
          >
            x
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <button
              onClick={capturePhoto}
              style={{
                padding: "20px 20px",
                background: "#FC5555",
                border: "none",
                borderRadius: "100%",
                cursor: "pointer",
                color: "white",
                position: "relative", // Ensure the frames are positioned relative to the button
                width: "60px", // Adjust width and height as needed
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                 {/* button-top-left corner */}
              <div className="modal-button-top-left-boundary"></div>
               {/* button-top-right corner */}
              <div className="modal-button-top-right-boundary"></div>
                {/* button-bottum-left corner */}
              <div className="modal-button-bottum-left-boundary"></div>
              {/* button-bottum-right corner */}
              <div className="modal-button-bottom-right-boundary"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
