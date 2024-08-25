import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Resource from "./Resource";
import ResourceForm from "./ResourceForm";
import { ItemTypes } from "./Constants";
import "./Module.css";

const Module = ({
  module = { id: "", name: "", resources: [] },
  renameModule,
  deleteModule,
  addResource,
  renameResource,
  deleteResource,
  moveResource,
}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.RESOURCE,
    drop: (item) => {
      moveResource(item.moduleId, item.id, module.id);
    },
  }));

  const [showForm, setShowForm] = useState(false);

  return (
    <div ref={drop} className="module">
      <div className="module-header">
        <input
          type="text"
          value={module.name}
          onChange={(e) => renameModule(module.id, e.target.value)}
          className="module-name"
        />
        <div className="module-actions">
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-resource-btn"
          >
            {showForm ? "Cancel" : "Add Resource"}
          </button>
          <button
            onClick={() => deleteModule(module.id)}
            className="delete-module-btn"
          >
            Delete Module
          </button>
        </div>
      </div>
      {showForm && (
        <ResourceForm addResource={addResource} moduleId={module.id} />
      )}
      <div className="resources">
        {module.resources.map((resource) => (
          <Resource
            key={resource.id}
            resource={resource}
            moduleId={module.id}
            renameResource={renameResource}
            deleteResource={deleteResource}
          />
        ))}
      </div>
    </div>
  );
};

export default Module;
