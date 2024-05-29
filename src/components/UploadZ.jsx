import React, { useRef, useState, useEffect } from "react";
import { Modal, Popover } from "antd";

import {
  sendNotify,
  fileToBase64,
  downloadFile,
  formatBytes,
  createEmptyArray,
} from "../helper";

import SelectLanguage from "./Language";

import PDFIcon from "../assets/img/pdf-icon.svg";
import DOCIcon from "../assets/img/doc-icon.svg";
import DOCXIcon from "../assets/img/docx-icon.svg";
import XLSIcon from "../assets/img/xls-icon.svg";
import XLSXIcon from "../assets/img/xlsx-icon.svg";
import CSVIcon from "../assets/img/csv-icon.svg";

export default function UploadZ(props) {
  let {
    file,
    fileName,
    downloadOnly,
    onStoreFile,
    showTranslation,
    showExtraction,
    hideDownload,
  } = props;

  const uploaderRef = useRef(null);

  const [document, setDocument] = useState(null);
  const [raw, setRaw] = useState(null);
  const [header, setHeader] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docModal, setDocModal] = useState(false);

  useEffect(() => {
    // extractFile(file);
    setDocument(file || null);
  }, [file]);

  const onFileUpload = (e) => {
    let file = e.target.files[0];
    extractFile(file);
    uploadCSV(file);
  };

  function uploadCSV(file) {
    if (file) {
      var myFile = file;
      var reader = new FileReader();

      reader.addEventListener("load", function (e) {
        let csvData = e.target.result;
        let data = getParseCsvData(csvData);
        setRaw(data);
        let arr = getAlphabetHeader(data[0].length);
        setHeader(arr);
      });

      reader.readAsBinaryString(myFile);
    }
  }

  function getParseCsvData(data) {
    let parsedata = [];

    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {
      parsedata.push(newLinebrk[i].split(","));
    }
    return parsedata;
  }

  const extractFile = (file) => {
    setError(false);
    let doc = {};
    if (file?.size > 10485760) {
      setError(true);
      sendNotify("error", "File is too big!, Upload below 10MB file.");
    } else {
      let type = file?.name.substring(file?.name.lastIndexOf(".") + 1);
      var regex = new RegExp("(.*?)(pdf|docx|doc|xls|xlsx|csv)$");
      if (regex.test(type)) {
        setLoading(true);
        fileToBase64(file)
          .then((data) => {
            doc["url"] = URL.createObjectURL(file);
            doc["name"] = file?.name;
            doc["size"] = formatBytes(file?.size);
            doc["type"] = type;
            doc["base64"] = data;
            setDocument(doc);
            onStoreFile({ document: fileName, base64: data });
            sendNotify("success", "File uploaded successfully.");
            setLoading(false);
          })
          .catch((error) => ({ error: JSON.stringify(error) }));
      } else {
        setError(true);
        sendNotify(
          "error",
          "Only PDF, DOC, DOCX, XLS or CSV file are supported."
        );
      }
    }
  };

  const fileIcons = {
    pdf: PDFIcon,
    doc: DOCIcon,
    docx: DOCXIcon,
    xls: XLSIcon,
    xlsx: XLSXIcon,
    csv: CSVIcon,
  };

  const viewDocument = () => {
    setDocModal(true);
  };

  const getAlphabetHeader = (length) => {
    const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    if (length > 26) {
      let list = alphabet;
      let arr = 0;
      if (length <= 52) {
        arr = 1;
      }
      if (length > 52 && length <= 78) {
        arr = 2;
      }
      if (length > 78 && length <= 104) {
        arr = 3;
      }
      for (let index = 0; index < arr; index++) {
        for (let i = 0; i < 26; i++) {
          list.push(alphabet[index] + alphabet[i]);
        }
      }
      return list;
    } else {
      return alphabet;
    }
  };

  const handleOk = () => {
    setDocModal(false);
  };

  const handleCancel = () => {
    setDocModal(false);
  };

  const LanguageSelect = (
    <div>
      <SelectLanguage className="w-300" />
      <button className="primary-btn mt-2 py-2">Submit</button>
    </div>
  );

  return (
    <div>
      <div className="uploader">
        <div className={`uploaded ${document ? "show-file" : ""}`}>
          <div className="uploaded-file">
            <img className="file-icon" src={fileIcons[document?.type]} alt="" />
            <div className="ms-2">
              <h6>{document?.name}</h6>
              <p>{document?.size}</p>
            </div>
          </div>
          <div className="d-flex gap-2 w-100">
            {/* ${document?.type !== "pdf" ? "btn-disabled" : ""} */}
            <button
              className={`view-btn w-100`}
              onClick={() => viewDocument(document?.name)}
            >
              <i className="far fa-eye"></i> View
            </button>
            {!downloadOnly && (
              <button
                className="download-btn"
                onClick={() => uploaderRef.current.click()}
              >
                <i className="far fa-sync"></i>
              </button>
            )}
            {showTranslation && (
              <Popover
                content={LanguageSelect}
                trigger="click"
                className="custom-popover"
                title="Select Language"
              >
                <button className="download-btn" title="Translation">
                  <i className="far fa-language"></i>
                </button>
              </Popover>
            )}
            {showExtraction && (
              <button className="download-btn" title="OCR Extraction">
                <i className="far fa-file-search"></i>
              </button>
            )}
            {!hideDownload && (
              <button
                className="download-btn"
                onClick={() => downloadFile(document?.url, document?.name)}
              >
                <i className="far fa-arrow-to-bottom"></i>
              </button>
            )}
            {!downloadOnly && (
              <button className="delete-btn" onClick={() => setDocument(null)}>
                <i className="fal fa-trash-alt"></i>
              </button>
            )}
          </div>
        </div>
        <div
          className={`upload-wrapper ${document ? "hide-upload" : ""} ${
            error ? "upload-error" : ""
          }`}
        >
          <input
            ref={uploaderRef}
            type="file"
            name={fileName}
            id="dealCsv"
            onChange={onFileUpload}
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <span className="icon">
            {loading ? (
              <i className="fal fa-spinner fa-spin"></i>
            ) : (
              <>
                {error ? (
                  <i className="fal fa-times-circle"></i>
                ) : (
                  <i className="fal fa-cloud-upload"></i>
                )}
              </>
            )}
          </span>
          <p>
            <b>Click to upload</b> or drag and drop <br /> PDF, DOC, DOCX, XLS
            or CSV (max. 10MB)
          </p>
        </div>
      </div>
      <Modal
        title={document?.name}
        className="custom-modal"
        open={docModal}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="document-view">
          {document?.type == "csv" ? (
            <div className="csv-table">
              <table className="cells">
                <thead>
                  <tr>
                    <td className="cells__spacer"></td>
                    {header?.map((head, i) => {
                      return (
                        <td key={i} className="cells__alphabet">
                          {head}
                        </td>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {raw?.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td key={index} className="cells__number">
                          {index + 1}
                        </td>
                        {row?.map((col, i) => {
                          return (
                            <td key={i} className="cells__input">
                              {col}
                            </td>
                          );
                        })}
                        {createEmptyArray(header?.length - row?.length)?.map(
                          (i) => {
                            return <td key={i} className="cells__input"></td>;
                          }
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <iframe
              src={
                document?.type == "pdf"
                  ? document?.url
                  : `https://view.officeapps.live.com/op/embed.aspx?src=${document?.url}`
              }
              frameBorder="0"
              height="100%"
              width="100%"
            ></iframe>
          )}
        </div>
      </Modal>
    </div>
  );
}
