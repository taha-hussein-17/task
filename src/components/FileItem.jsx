import React from 'react';

export default function FileItem({ file, onDragStart, onDrop, onDragOver, onClick, isOpen, renderFiles }) {
  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: file.isFolder ? "#f0f0f0" : "#fff",
        cursor: file.isFolder ? "pointer" : "move"
      }}
      draggable={!file.isFolder}
      onDragStart={() => onDragStart(file)}
      onDrop={() => onDrop(file)}
      onDragOver={(e) => file.isFolder && e.preventDefault()}
      onClick={() => file.isFolder && onClick(file)}
    >
      {file.isFolder ? (
        <span>{isOpen ? "📂" : "📁"} {file.name}</span>
      ) : (
        <span>📄 {file.name}</span>
      )}
      {file.isFolder && isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {renderFiles(file.path + file.name + "/")}
        </div>
      )}
    </div>
  );
}
