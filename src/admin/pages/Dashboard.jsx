import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold">Welcome Admin 👋</h2>
        {/* Add stats or overview later */}
      </div>
    </div>
  );
}
