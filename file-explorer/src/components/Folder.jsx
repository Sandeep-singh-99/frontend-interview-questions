import { useState } from "react";

function Folder({ data, onInsertNode }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpanded(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      onInsertNode(data.id, e.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  if (data.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgb(233, 233, 233)",
            padding: "5px",
            borderRadius: "5px",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <span>📁 {data.name}</span>

          <div>
            <button onClick={(e) => handleFolder(e, true)}>Folder ➕</button>

            <button onClick={(e) => handleFolder(e, false)}>File ➕</button>
          </div>
        </div>

        <div
          style={{ display: expanded ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              {showInput.isFolder ? "📁" : "📄"}
              <input
                onKeyDown={onAddFolder}
                autoFocus
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
              />
            </div>
          )}

          {data.items.map((exp) => {
            return (
              // <span>
              //     {exp.name}
              // </span>
              <Folder data={exp} key={exp.id} onInsertNode={onInsertNode} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file"> 📄 {data.name}</span>;
  }
}

export default Folder;
