import "./modal.css";
import Axios from "axios";
var fileDownload = require("js-file-download");

const ModalView = (props) => {
  var move = "";
  if (props.filename.length >= 13) {
    move = "demo-1";
  } else {
    move = "demo-2";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        borderRadius: 5,
        background: "white",
      }}
    >
      <div className={move}>
        <span>
          {props.filename.length > 30
            ? props.filename.substring(0, 15)
            : props.filename}
        </span>
      </div>
      <div className="properties">
        <span style={{ fontSize: 25 }}>File Properties</span>
        <span>Size: {props.size}</span>
      </div>
      <div
        onClick={() => {
          function download(url, filename) {
            Axios.get(url, {
              responseType: "blob",
            }).then((res) => {
              fileDownload(res.data, filename);
            });
          }
          download(
            process.env.REACT_APP_URL + "download/" + props.filename,
            props.filename
          );
        }}
        className="download"
      >
        Download
      </div>
    </div>
  );
};

export default ModalView;
