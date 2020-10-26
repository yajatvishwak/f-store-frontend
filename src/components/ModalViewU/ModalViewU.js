import "./modal.css";
require("dotenv").config();
const ModalViewU = (props) => {
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
        <span>Upload</span>
      </div>

      <div className="properties">
        <form
          action={process.env.REACT_APP_URL + "upload"}
          method="post"
          encType="multipart/form-data"
          className="form"
        >
          <input type="file" name="sampleFile" />
          <input type="submit" className="download" value="Upload!" />
        </form>
      </div>
    </div>
  );
};

export default ModalViewU;
