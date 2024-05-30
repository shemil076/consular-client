import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // This is for redirecting
import "../assets/css/popup.css";

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
      <div className="px-5 mx-5">
        <div className="d-flex justify-content-between custom-border-bottom py-5">
          <div>
            <h5>Live Photo</h5>
            <p>Capture a clear photo of yourself for identity verification.</p>
          </div>
          <div>
            <div className="uploader photo-upload">
              <div className="upload-wrapper ms-auto">
                <input type="file" name="photo" draggable />
                <div>
                  <div className="upload-icon">
                    <i className="ri-crosshair-2-line"></i>
                  </div>
                  <p>
                    Previously taken photos or uploads are not supported in this
                    step.
                  </p>
                </div>
              </div>
            </div>
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
                  <div className="upload-icon">
                    <i className="ri-upload-2-line"></i>
                  </div>
                  <p
                    style={{
                      color: docFrontHandler.file ? "white" : "",
                    }}
                  >
                    {docFrontHandler.file
                      ? `File: ${docFrontHandler.file.name}`
                      : "JPG, JPEG, PNG and PDF formats. Max file size: 5MB"}
                  </p>
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
                  <div className="upload-icon">
                    <i className="ri-upload-2-line"></i>
                  </div>
                  <p
                    style={{
                      color: docBackHandler.file ? "white" : "",
                    }}
                  >
                    {docBackHandler.file
                      ? `File: ${docBackHandler.file.name}`
                      : "JPG, JPEG, PNG and PDF formats. Max file size: 5MB"}
                  </p>
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
            <button className="secondary-btn">Reset</button>
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
