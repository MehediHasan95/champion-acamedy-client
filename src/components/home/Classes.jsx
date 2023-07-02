import swal from "sweetalert";
import useAllClasses from "../../hooks/useAllClasses";
import useAuth from "../../hooks/useAuth";
import ClassesCard from "../utilities/ClassesCard";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { SnackbarError, SnackbarSuccess } from "../utilities/Snackbar";

function Classes() {
  const [allClasses, isLoading] = useAllClasses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [instance] = useAxiosSecure();

  const handleAddToCart = (course) => {
    const { _id, courseName, instructorEmail, instructorName, price, image } =
      course;

    if (user) {
      instance
        .post("/add-to-cart", {
          uid: user?.uid,
          classId: _id,
          courseName,
          instructorName,
          instructorEmail,
          price,
          image,
        })
        .then((res) => {
          if (res.data.insertedId) {
            SnackbarSuccess("Add to Cart successfull");
          } else {
            SnackbarError("Already added");
          }
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
