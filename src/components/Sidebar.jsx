export default function Sidebar({ files, setCurrentPath, currentPath }) {
  const folders = files.filter(f => f.isFolder);

  return (
    <div className="sidebar">
      <h3>File System</h3>
      <ul>
        <li
          onClick={() => setCurrentPath("/")}
          className={currentPath === "/" ? "active" : ""}
        >
          Root
        </li>
        {folders.map(folder => (
          <li
            key={folder.id}
            onClick={() => setCurrentPath(folder.path + folder.name + "/")}
            className={currentPath === folder.path + folder.name + "/" ? "active" : ""}
          >
            📁 {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
