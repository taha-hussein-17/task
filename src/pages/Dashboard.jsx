import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FileItem from "../components/FileItem";
import Breadcrumbs from "../components/Breadcrumbs";

const initialFiles = [
  { id: 1, name: "File1.txt", path: "/", isFolder: false },
  { id: 2, name: "File2.txt", path: "/", isFolder: false },
  { id: 3, name: "FolderA", path: "/", isFolder: true },
  { id: 4, name: "File3.txt", path: "/FolderA/", isFolder: false },
  { id: 5, name: "FolderB", path: "/", isFolder: true },
  { id: 6, name: "File4.txt", path: "/FolderB/", isFolder: false }
];

export default function Dashboard() {
  const [files, setFiles] = useState(initialFiles);
  const [currentPath, setCurrentPath] = useState("/");
  const [draggedFile, setDraggedFile] = useState(null);
  const [openFolders, setOpenFolders] = useState({});
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("file"); // 'file' or 'folder'
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handleDragStart = (file) => {
    setDraggedFile(file);
  };

  const handleDrop = (folder) => {
    if (draggedFile && folder.isFolder) {
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === draggedFile.id
            ? { ...f, path: folder.path + folder.name + "/" }
            : f
        )
      );
      setDraggedFile(null);
    }
  };

  const filteredFiles = files.filter(f => f.path === currentPath);

  const handleFolderClick = (folderName) => {
    setCurrentPath(prev => prev + folderName + "/");
  };

  const handleBreadcrumbClick = (path) => {
    setCurrentPath(path);
  };

  const handleCreate = () => {
    if (!newItemName.trim()) return;

    const newFile = {
      id: files.length + 1,
      name: newItemName,
      path: currentPath,
      isFolder: newItemType === "folder"
    };

    setFiles(prev => [...prev, newFile]);
    setNewItemName("");
    setShowCreateForm(false);
  };

  return (
    <div className="dashboard">
      <Sidebar
        files={files}
        setCurrentPath={setCurrentPath}
        currentPath={currentPath}
      />

      <div className="main-area">
        <div className="top-bar">
          <h2>Dashboard</h2>
          <div>
            <button
              style={{ marginRight: '10px', backgroundColor: '#28a745' }}
              onClick={() => setShowCreateForm(true)}
            >
              ➕ Create
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <Breadcrumbs currentPath={currentPath} onBreadcrumbClick={handleBreadcrumbClick} />

        {showCreateForm && (
          <div className="create-form">
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
            <input
              type="text"
              placeholder="Enter name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewItemName("");
              }}
              style={{ backgroundColor: 'gray' }}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="file-grid">
          {filteredFiles.map(file => (
            <FileItem
              key={file.id}
              file={file}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={(e) => file.isFolder && e.preventDefault()}
              onDoubleClick={() => {
                if (file.isFolder) {
                  handleFolderClick(file.name);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
