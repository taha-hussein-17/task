export default function FileItem({ file, onDragStart, onDrop, onDragOver, onDoubleClick }) {
  return (
    <div
      className={`file-item ${file.isFolder ? "folder" : "file"}`}
      draggable
      onDragStart={() => onDragStart(file)}
      onDrop={(e) => onDrop(file)}
      onDragOver={onDragOver}
      onDoubleClick={onDoubleClick}
    >
      <div className="icon">
        {file.isFolder ? "📁" : "📄"}
      </div>
      <div className="name">{file.name}</div>
    </div>
  );
}
