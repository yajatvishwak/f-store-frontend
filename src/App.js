import "./App.css";
import Modal from "simple-react-modal";
import { useEffect, useState } from "react";
import ModalView from "./components/ModalView/ModalView";
import ModalViewU from "./components/ModalViewU/ModalViewU";
import Axios from "axios";
require("dotenv").config();

function App() {
  const [modal, setModal] = useState(false);
  const [modalU, setModalU] = useState(false);
  const [selectedFile, setSelectedFile] = useState("undefined");
  const [selectedSize, setSelectedSize] = useState("undef");
  //const [selectedDate, setSelectedDate] = useState("undef");
  //const [selectedOwner, setSelectedOwner] = useState("undef");
  const [allFiles, setAllFiles] = useState([]);
  useEffect(() => {
    console.log("inuse");
    Axios.get(process.env.REACT_APP_URL + "getFiles").then((res) => {
      setAllFiles(res.data);
    });
  }, []);
  const oncloseModal = () => {
    setModal(false);
  };
  const oncloseModalU = () => {
    setModalU(false);
  };

  const fileobj = allFiles.map((item) => {
    return (
      <tr
        onClick={(e) => {
          setFile(e.currentTarget);
          setModal(true);
        }}
      >
        <td>{item.filename}</td>
        <td>{item.filesize}</td>
      </tr>
    );
  });

  const setFile = (obj) => {
    //console.log(obj.innerHTML);
    var arr = obj.innerHTML.trim().split("<td>");
    setSelectedFile(arr[1].substring(0, arr[1].length - 5));
    setSelectedSize(arr[2].substring(0, arr[2].length - 5));
    //setSelectedDate(arr[3].substring(0, arr[3].length - 5));
    //setSelectedOwner(arr[4].substring(0, arr[4].length - 5));
  };

  return (
    <div>
      <Modal
        containerStyle={{ background: "transparent" }}
        show={modal}
        onClose={oncloseModal}
      >
        <ModalView filename={selectedFile} size={selectedSize} />
      </Modal>
      <Modal
        containerStyle={{ background: "transparent" }}
        show={modalU}
        onClose={oncloseModalU}
      >
        <ModalViewU filename={selectedFile} size={selectedSize} />
      </Modal>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {" "}
            <span className="header">F-Store</span>
            <div
              style={{
                marginTop: 10,
                marginLeft: 15,
                borderRadius: 20,
                width: 80,
                display: "flex",
                alignItems: "center",
                height: 40,
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "black",
              }}
              onClick={() => {
                setModalU(true);
              }}
            >
              Upload
            </div>
          </div>
          <span className="subheader">Storage for the Vishwakarma Family</span>
        </div>
        <table className="tables">
          <th>FileName</th>
          <th>Size(in MB)</th>

          {fileobj}
        </table>
      </div>
    </div>
  );
}

export default App;
