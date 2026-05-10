import { useNavigate } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full rounded-2xl bg-white p-6 shadow-lg md:w-1/3 lg:w-1/4">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 text-3xl font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <hr className="my-5" />

            <div className="space-y-3">
              <button className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full rounded-lg border border-red-500 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6">
              <MyOrdersPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
