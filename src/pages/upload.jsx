import React, { useState, useEffect } from "react";

export default function Upload() {
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
                <input type="file" name="photo" draggable />
                <div>
                  <div className="upload-icon">
                    <i className="ri-upload-2-line"></i>
                  </div>
                  <p>JPG and PNG formats. Max file size: 5MB</p>
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
                <input type="file" name="photo" draggable />
                <div>
                  <div className="upload-icon">
                    <i className="ri-upload-2-line"></i>
                  </div>
                  <p>JPG and PNG formats. Max file size: 5MB</p>
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
