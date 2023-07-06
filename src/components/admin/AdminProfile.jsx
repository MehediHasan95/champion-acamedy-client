import useTitle from "../../hooks/useTitle";
import Profile from "../shared/Profile";

function AdminProfile() {
  useTitle("Profile");
  return (
    <div className="min-h-75 grid place-items-center my-20">
      <Profile />
    </div>
  );
}

export default AdminProfile;
