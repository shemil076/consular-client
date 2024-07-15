import React, { useRef, useState, useEffect } from "react";
import Modal from "./../assets/css/cameraModal.css";
import "./../assets/css/popup.css";

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
        <div className="modal-container">
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              className="video-feed"
            />
          </div>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="hidden-canvas"
          />
          <div>
            <h4 className="modal-top-text">Position your face in the frame</h4>
          </div>
          <div className="modal-top-left-boundary" />
          <div className="modal-top-right-boundary" />
          <div className="modal-bottom-left-boundary" />
          <div className="modal-bottom-right-boundary" />
          <button
            className="close-button"
            onClick={() => closeModal()}
          >
            x
          </button>
          <div className="button-container">
            <button
              onClick={capturePhoto}
              className="capture-button"
            >
              <div className="modal-button-top-left-boundary"></div>
              <div className="modal-button-top-right-boundary"></div>
              <div className="modal-button-bottom-left-boundary"></div>
              <div className="modal-button-bottom-right-boundary"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;