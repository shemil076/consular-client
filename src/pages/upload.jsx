import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // This is for redirecting
import "../assets/css/popup.css";
import WebcamCapture from "./WebcamCapture";

// SVG placeholder - replace these with actual SVGs or components
const PdfIcon = () => (
  <i
    className="ri-file-pdf-2-line"
    style={{ fontSize: "40px", color: "white" }}
  ></i>
);
const ReuploadIcon = () => (
  <i
    className="ri-upload-2-line"
    style={{ fontSize: "20px", color: "white" }}
  ></i>
);

function useFileHandler(allowedTypes, maxSizeMB) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const theme = useSelector((state) => state.theme.themeMode); // Accessing theme from Redux store

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        allowedTypes.includes(file.type) &&
        file.size <= maxSizeMB * 1024 * 1024
      ) {
        setFile(file);
        setError("");
        console.log("File ready for upload:", file);
      } else {
        setFile(null);
        setError(
          `Please upload a valid file type and ensure the size is less than ${maxSizeMB} MB.`
        );
        alertStyle(theme);
      }
    }
  };

  const alertStyle = (theme) => {
    const alertColor = theme === "dark" ? "#d9534f" : "#f8d7da"; // Colors depending on the theme
    window.alert(`File size should be less than ${maxSizeMB} MB.`, {
      style: { background: alertColor },
    });
  };

  return {
    file,
    error,
    handleFileChange,
  };
}

export default function Upload() {
  const [showPopup, setShowPopup] = useState(false);
  const [blur, setBlur] = useState(false);
  const [bodyBgColor, setBodyBgColor] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const openModal = () => {
    capturedImage && setCapturedImage(null);
    setIsModalOpen(true);
  };

  const docFrontHandler = useFileHandler(
    ["image/jpeg", "image/png", "application/pdf"],
    5
  );
  const docBackHandler = useFileHandler(
    ["image/jpeg", "image/png", "application/pdf"],
    5
  );

  useEffect(() => {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    setBodyBgColor(bgColor);
  }, []);

  const handleSubmit = async () => {
    // setBlur(false);
    // You need to replace the below with your actual API call
    // await uploadFiles(docFrontHandler.file, docBackHandler.file);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBlur(false);
    navigate("/upload"); // Redirect to upload page or wherever appropriate
  };

  return (
    <div className="upload-doc">
      <div class="px-auto mx-auto">
        <div className="d-flex justify-content-between custom-border-bottom py-5">
          <div>
            <h5>Live Photo</h5>
            <p>Capture a clear photo of yourself for identity verification.</p>
          </div>
          <div>
            {capturedImage ? (
              <div
                className="uploader photo-upload"
                style={{ position: "relative" }}
              >
                <div className="upload-wrapper">
                  <img
                    className="upload-wrapper"
                    src={capturedImage}
                    alt="Captured"
                    style={{
                      position: "absolute",
                      left: "0%",
                      transform: "scaleX(-1)",
                      padding: 0,
                    }}
                  />
                  <div
                    className="upload-icon"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      marginRight: "5%",
                      cursor: "pointer",
                    }}
                    onClick={openModal}
                  >
                    <i className="ri-crosshair-2-line"></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="uploader photo-upload" onClick={openModal}>
                <div className="upload-wrapper ms-auto">
                  {isModalOpen && (
                    <WebcamCapture
                      isModalOpen={isModalOpen}
                      closeCamModal={setIsModalOpen}
                      setCapturedImage={setCapturedImage}
                    />
                  )}

                  <div>
                    <div className="upload-icon">
                      <i className="ri-crosshair-2-line"></i>
                    </div>
                    <p>
                      Previously taken photos or uploads are not supported in
                      this step.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between custom-border-bottom py-5">
          <div>
            <h5>Document Front</h5>
            <p>Upload a clear image of the front side of your document.</p>
          </div>
          <div>
            <div className="uploader doc-upload">
              <div className="upload-wrapper py-5 ms-auto">
                <input
                  type="file"
                  name="photo"
                  draggable
                  onChange={docFrontHandler.handleFileChange}
                  accept="image/jpeg, image/png, application/pdf"
                />
                <div>
                  {docFrontHandler.file && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {docFrontHandler.file.type === "application/pdf" && (
                        <PdfIcon />
                      )}
                      <p
                        style={{ color: "white" }}
                      >{`File: ${docFrontHandler.file.name}`}</p>
                      <div
                        onClick={() => docFrontHandler.handleFileChange(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <ReuploadIcon />
                      </div>
                    </div>
                  )}
                  {!docFrontHandler.file && (
                    <div>
                      <div className="upload-icon">
                        <i className="ri-upload-2-line"></i>
                      </div>
                      <p>JPG, JPEG, PNG, and PDF formats. Max file size: 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between custom-border-bottom py-5">
          <div>
            <h5>Document Back</h5>
            <p>Upload a clear image of the back side of your document.</p>
          </div>
          <div>
            <div className="uploader doc-upload">
              <div className="upload-wrapper py-5 ms-auto">
                <input
                  type="file"
                  name="photo"
                  draggable
                  onChange={docBackHandler.handleFileChange}
                  accept="image/jpeg, image/png, application/pdf"
                />
                <div>
                  {docBackHandler.file && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {docBackHandler.file.type === "application/pdf" && (
                        <PdfIcon />
                      )}
                      <p
                        style={{ color: "white" }}
                      >{`File: ${docBackHandler.file.name}`}</p>
                      <div
                        onClick={() => docBackHandler.handleFileChange(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <ReuploadIcon />
                      </div>
                    </div>
                  )}
                  {!docBackHandler.file && (
                    <div>
                      <div className="upload-icon">
                        <i className="ri-upload-2-line"></i>
                      </div>
                      <p>JPG, JPEG, PNG, and PDF formats. Max file size: 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="upload-doc"
          style={{ filter: blur ? "blur(4px)" : "none" }}
        >
          <div className="d-flex justify-content-between align-item-center py-5">
            <button
              className="secondary-btn"
              onClick={() => navigate("/upload")}
            >
              Reset
            </button>
            <button className="primary-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {showPopup && (
            <div className="popup-overlay">
              <div
                className="popup"
                style={{
                  background: bodyBgColor,
                }}
              >
                <div className="popup-header">
                  <i className="ri-check-line popup-icon"></i>
                  <h5>Thank you!</h5>
                </div>
                <p className="popup-message">Your submission has been sent.</p>
                <button
                  className="primary-btn popup-button"
                  onClick={handleClosePopup}
                >
                  Okay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
