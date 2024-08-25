import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";
import { FaFile, FaLink, FaImage } from "react-icons/fa";
import "./Resource.css";

const Resource = ({ resource, moduleId, renameResource, deleteResource }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.RESOURCE,
    item: { ...resource, moduleId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    if (resource.type === "file") {
      return <FaFile />;
    }
    if (resource.type === "image") {
      return <FaImage />;
    }
    return <FaLink />;
  };

  return (
    <div
      ref={drag}
      className="resource"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="resource-icon">{getIcon()}</div>
      <input
        type="text"
        value={resource.name}
        onChange={(e) => renameResource(moduleId, resource.id, e.target.value)}
        className="resource-name"
      />
      <button
        onClick={() => deleteResource(moduleId, resource.id)}
        className="delete-resource-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default Resource;
