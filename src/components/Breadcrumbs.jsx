export default function Breadcrumbs({ currentPath, onBreadcrumbClick }) {
  const parts = currentPath.split("/").filter(Boolean);
  let pathAccumulator = "";

  return (
    <div className="breadcrumbs">
      <span onClick={() => onBreadcrumbClick("/")}>Root</span>
      {parts.map((part, idx) => {
        pathAccumulator += `${part}/`;
        return (
          <span key={idx} onClick={() => onBreadcrumbClick("/" + pathAccumulator)}>
            / {part}
          </span>
        );
      })}
    </div>
  );
}
