import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Module from "./components/Module";
import "./App.css";

const App = () => {
  const [modules, setModules] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: nextId,
        name: `Module ${nextId}`,
        resources: [],
      },
    ]);
    setNextId(nextId + 1);
  };

  const renameModule = (id, newName) => {
    setModules(
      modules.map((mod) => (mod.id === id ? { ...mod, name: newName } : mod))
    );
  };

  const deleteModule = (id) => {
    setModules(modules.filter((mod) => mod.id !== id));
  };

  const addResource = (moduleId, resource) => {
    setModules(
      modules.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            resources: [...mod.resources, { id: nextId, ...resource }],
          };
        }
        return mod;
      })
    );
    setNextId(nextId + 1);
  };

  const renameResource = (moduleId, resourceId, newName) => {
    setModules(
      modules.map((mod) => ({
        ...mod,
        resources: mod.resources.map((res) =>
          res.id === resourceId ? { ...res, name: newName } : res
        ),
      }))
    );
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(
      modules.map((mod) => ({
        ...mod,
        resources: mod.resources.filter((res) => res.id !== resourceId),
      }))
    );
  };

  const moveResource = (sourceModuleId, resourceId, targetModuleId) => {
    if (sourceModuleId === targetModuleId) return;
    setModules(
      modules.map((mod) => {
        if (mod.id === sourceModuleId) {
          return {
            ...mod,
            resources: mod.resources.filter((res) => res.id !== resourceId),
          };
        }
        if (mod.id === targetModuleId) {
          const resource = modules
            .find((m) => m.id === sourceModuleId)
            .resources.find((res) => res.id === resourceId);
          return { ...mod, resources: [...mod.resources, resource] };
        }
        return mod;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <h1>Course Builder</h1>
          <button onClick={addModule} className="add-module-btn">
            Add Module
          </button>
        </header>
        <div className="modules-container">
          {modules.map((mod) => {
            if (!mod || !mod.resources) {
              console.error("Module is invalid:", mod);
              return null; // Skip rendering this module
            }
            return (
              <Module
                key={mod.id}
                module={mod}
                renameModule={renameModule}
                deleteModule={deleteModule}
                addResource={addResource}
                renameResource={renameResource}
                deleteResource={deleteResource}
                moveResource={moveResource}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
