import { useState } from 'react';
import { useSelector } from 'react-redux';

function useFileHandler(allowedTypes, maxSizeMB) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const theme = useSelector(state => state.theme.themeMode);  // Accessing theme from Redux store

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
        setError(`Please upload a valid file type and ensure the size is less than ${maxSizeMB} MB.`);
        alertStyle(theme);
      }
    }
  };

  const alertStyle = (theme) => {
    const alertColor = theme === 'dark' ? '#d9534f' : '#f8d7da';  // Colors depending on the theme
    window.alert(`File size should be less than ${maxSizeMB} MB.`, { style: { background: alertColor } });
  };

  return {
    file,
    error,
    handleFileChange,
  };
}

export default function Upload() {
  const photoHandler = useFileHandler(["image/jpeg", "image/png"], 5);
  const docFrontHandler = useFileHandler(
    ["image/jpeg", "image/png", "application/pdf"],
    5
  );
  const docBackHandler = useFileHandler(
    ["image/jpeg", "image/png", "application/pdf"],
    5
  );

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
                  <p>{docFrontHandler.file ? `File: ${docFrontHandler.file.name}` : "JPG, JPEG, PNG and PDF formats. Max file size: 5MB"}</p>
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
                  <p>{docBackHandler.file ? `File: ${docBackHandler.file.name}` : "JPG, JPEG, PNG and PDF formats. Max file size: 5MB"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-item-center py-5">
          <button className="secondary-btn">Reset</button>
          <button className="primary-btn">Submit</button>
        </div>
      </div>
    </div>
  );
}
