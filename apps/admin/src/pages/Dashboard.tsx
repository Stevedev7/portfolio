import { useDispatch } from "react-redux";
import { clearToken } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
      <p className="mt-2 text-gray-600">Content management will go here.</p>
    </div>
  );
};

export default Dashboard;
