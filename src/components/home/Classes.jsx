import swal from "sweetalert";
import useAllClasses from "../../hooks/useAllClasses";
import useAuth from "../../hooks/useAuth";
import ClassesCard from "../utilities/ClassesCard";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function Classes() {
  const [allClasses, isLoading] = useAllClasses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [instance] = useAxiosSecure();

  const handleAddToCart = (course) => {
    const {
      uid,
      _id,
      courseName,
      instructorEmail,
      instructorName,
      price,
      image,
    } = course;

    if (user) {
      console.log(" okay");
      instance
        .post(`/add-to-cart?uid=${user?.uid}`, {
          uid,
          _id,
          courseName,
          instructorName,
          instructorEmail,
          price,
          image,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      swal("Please login before add to cart.", {
        icon: "warning",
        buttons: [true, "Login"],
      }).then((value) => {
        if (value) {
          navigate("/auth");
        }
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 px-3">
        {!isLoading &&
          allClasses?.map((e) => (
            <ClassesCard
              key={e._id}
              allClasses={e}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default Classes;
