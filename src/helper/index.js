import { Children } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { notification } from "antd";
import axios from "axios";

import { store } from "../store/configureStore";
import { checkLogged } from "../store/auth/authSlice";
import NoData from "../components/NoData";
import Loading from "../components/Loading";

export function percentageOf(value, total) {
  return ((value / total) * 100).toFixed(0);
}

export const isEmpty = (array) => {
  let bool = array.length == 0 ? true : false;
  return bool;
};

export function createEmptyArray(size) {
  var x = [];
  for (var i = 0; i < size; ++i) {
    x[i] = i;
  }
  return x;
}

export const isObjectEmpty = (obj) => {
  let bool = Object.keys(obj).length == 0 ? true : false;
  return bool;
};

export const fetchApi = async (payload) => {
  const response = await axios(payload)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      if (error?.response?.status === 403) {
        sendNotify("error", "Token was expired!");
        localStorage.removeItem(process.env.REACT_APP_JWT_TOKEN);
        store.dispatch(checkLogged());
      }
      return { error: error };
    });
  return response;
};

export async function downloading(fileLink) {
  await axios({
    url: fileLink,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file_test.pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export const focusOn = (id) => {
  setTimeout(() => {
    document.getElementById(id).scrollIntoView();
  }, 100);
};

export const sendNotify = (type, content) => {
  notification.open({
    type: type,
    message: content,
  });
};

export const downloadFile = (path, filename) => {
  var link = document.createElement("a");
  link.href = path;
  link.download = filename;
  link.dispatchEvent(new MouseEvent("click"));
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export function formatBytes(bytes, decimals = 0) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const downloadBase64 = (base64String, filename) => {
  const bytes = atob(base64String);
  const arrayBuffer = new ArrayBuffer(bytes.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < bytes.length; i++) {
    uint8Array[i] = bytes.charCodeAt(i);
  }

  const workbook = XLSX.read(uint8Array, { type: "array" });
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  saveAs(blob, filename);
};

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const downloadAsCSV = (apiData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  saveAs(data, fileName + fileExtension);
};

export const Each = ({ loading, loadingStyle, render, array, warning }) =>
  loading ? (
    <Loading type={loadingStyle} />
  ) : (
    Children.toArray(
      array.length > 0 ? (
        array.map((item, index) => render(item, index))
      ) : !warning ? (
        <></>
      ) : (
        <NoData />
      )
    )
  );

// export const Show = (props) => {
//   let when = null;
//   let otherwise = null;

//   Children.forEach(props?.children, children => {
//     if (children?.props?.isTrue === undefined) {
//       otherwise == children;
//     } else if (!when && children?.props?.isTrue === true) {
//       when = children;
//     }
//   });

//   return when || otherwise;
// };

// Show.When = ({ isTrue, children }) => isTrue && children;
// Show.Else = ({ render, children }) => render || children;

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url?.replace("-", "+").replace("_", "/");
  let data = getAtob(base64) ? getAtob(base64) : null;
  let details = {};
  details = { ...JSON.parse(data) };
  return details;
}

export function getAtob(data) {
  try {
    return window.atob(data);
  } catch (e) {
    return false;
  }
}

export function getOptions(data) {
  let arr = [];
  let obj = {};
  data?.map((option) => {
    obj["label"] = `${option?.name} - ${option?.code}`;
    obj["value"] = option?.code;
    arr.push(obj);
    obj = {};
  });
  return arr;
}

// ('.ppt' '.pptx' '.doc', '.docx', '.xls', '.xlsx'):-
// src = "https://view.officeapps.live.com/op/embed.aspx?src=(Link)";
// Sample Doc: https://file-examples.com/storage/fe2b7cb2a965d5350a124db/2017/02/file-sample_100kB.doc
// Sample Excel: https://file-examples.com/storage/fe2b7cb2a965d5350a124db/2017/02/file_example_XLS_10.xls
