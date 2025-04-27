import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileItem from "../components/FileItem";

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
  const [draggedFile, setDraggedFile] = useState(null);
  const [openFolders, setOpenFolders] = useState({});
  const [currentPath, setCurrentPath] = useState("/");
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

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder.id]: !prev[folder.id]
    }));
  };

  const handleFolderClick = (folder) => {
    setCurrentPath(folder.path + folder.name + "/");
  };

  const handleBackClick = () => {
    const pathParts = currentPath.split("/").filter(Boolean);
    pathParts.pop();
    const newPath = "/" + pathParts.join("/") + "/";
    setCurrentPath(newPath);
  };

  const renderFiles = (currentPath) => {
    const items = files.filter(f => f.path === currentPath);

    return items.map(file => (
      <div
        key={file.id}
        className="file-item"
        draggable
        onDragStart={() => handleDragStart(file)}
        onDrop={(e) => handleDrop(file)}
        onDragOver={(e) => file.isFolder && e.preventDefault()}
        style={{
          display: 'block',
          
          width: '200px',
          margin: '15px',
          textAlign: 'center',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: file.isFolder && openFolders[file.id] ? '#e7f1fe' : '#ffffff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: draggedFile && draggedFile.id === file.id ? 'scale(1.05)' : 'scale(1)',
        }}
        onClick={() => file.isFolder && toggleFolder(file)} >
        <div style={{ marginBottom: '10px' }}>
          {file.isFolder ? (
            <span style={{ fontSize: '48px', color: '#007BFF' }}>📂</span>
          ) : (
            <span style={{ fontSize: '48px', color: '#28a745' }}>📄</span>
          )}
        </div>
        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
          {file.name}
        </div>
        {file.isFolder && openFolders[file.id] && (
          <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
            {renderFiles(file.path + file.name + "/")}

          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      style={{
        padding: "20px",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ fontSize: '30px', color: '#333', marginBottom: '20px' }}>📋 Dashboard - Files & Folders</h2>

      <button
        onClick={handleLogout}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "tomato",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: '16px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#e53e3e'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'tomato'}
      >
        Logout
      </button>

      {/*
       Breadcrumbs / المسار الحالي
بعرض لحضرتك المسارات بتاع الفايلات عاملة ازاي
       */}
      <div style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
        <span
          style={{ cursor: 'pointer', color: '#007BFF' }}
          onClick={() => setCurrentPath("/")}
        >
          Root
        </span>
        {currentPath !== "/" && (
          <>
            {' > '}
            <span
              style={{ cursor: 'pointer', color: '#007BFF' }}
              onClick={handleBackClick}
            >
              Back
            </span>
          </>
        )}
      </div>

      <div style={{ marginTop: "20px", width: '100%' }}>
        {renderFiles(currentPath)}
      </div>

      <hr style={{ marginTop: "40px", border: '1px solid #ddd' }} />

      <h3 style={{ fontSize: '18px', color: '#555' }}>📜 Current Files State:</h3>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
        {JSON.stringify(files, null, 2)}
      </pre>
    </div>
  );
}
