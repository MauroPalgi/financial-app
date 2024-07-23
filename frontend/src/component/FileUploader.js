// src/FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setData, type }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { REACT_APP_API_URL } = process.env;

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}pagos?tipo=${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = response;
      setData(data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);

      setMessage("Error processing file");
    }
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
