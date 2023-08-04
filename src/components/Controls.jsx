export default function Controls({
  zoom,
  setZoom,
  showLabels,
  setShowLabels,
  iconScale,
  setIconScale,
  fontSize,
  setFontSize,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  return (
    <div className="flex gap-10 bg-slate-700 p-2">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="hidden md:block outline outline-1 outline-slate-400 rounded-md py-1 px-2"
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <button
        onClick={() => setShowLabels((prev) => !prev)}
        className="outline outline-1 outline-slate-400 rounded-md py-1 px-2"
      >
        {showLabels ? "Hide Labels" : "Show Labels"}
      </button>
      <div className="flex flex-col gap-1 text-center">
        <p>Zoom: {zoom}</p>
        <input
          type="range"
          id="zoom"
          name="zoom"
          min="0"
          max="30"
          value={zoom}
          step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p>Icon Size: {iconScale}</p>
        <input
          type="range"
          id="icon-size"
          name="icon-size"
          min="0"
          max="100"
          value={iconScale}
          step={1}
          onChange={(e) => setIconScale(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p>Label Font Size: {fontSize}</p>
        <input
          type="range"
          id="font-size"
          name="font-size"
          min="6"
          max="20"
          value={fontSize}
          step={1}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
