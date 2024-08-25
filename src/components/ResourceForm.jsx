import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ResourceForm.css";

const ResourceForm = ({ addResource, moduleId }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resourceId = uuidv4();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addResource(moduleId, {
          id: resourceId,
          name,
          url: reader.result,
          type: "file",
        });
        setName("");
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else if (url) {
      addResource(moduleId, { id: resourceId, name, url, type: "link" });
      setName("");
      setUrl("");
    } else {
      addResource(moduleId, { id: resourceId, name, url: "", type: "text" });
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resource-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Resource Name"
        required
        className="resource-input"
      />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Resource URL (optional)"
        className="resource-input"
      />
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button type="submit" className="submit-btn">
        Add Resource
      </button>
    </form>
  );
};

export default ResourceForm;
