import swal from "sweetalert";
import useAllClasses from "../../hooks/useAllClasses";
import useAuth from "../../hooks/useAuth";
import ClassesCard from "../utilities/ClassesCard";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { SnackbarError, SnackbarSuccess } from "../utilities/Snackbar";
import useAddToCart from "../../hooks/useAddToCart";
import { noData } from "../utilities/utils";
import useTitle from "../../hooks/useTitle";

function Classes() {
  useTitle("Classes");
  const [allClasses, isLoading] = useAllClasses();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [instance] = useAxiosSecure();
  const [carts, refetch] = useAddToCart();

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
            refetch();
          } else {
            SnackbarError("Already added");
            refetch();
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
    <div className="min-h-75 max-w-screen-2xl mx-auto my-10">
      {allClasses?.length > 0 ? (
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
      ) : (
        <div className="min-h-75 grid place-items-center">
          <img src={noData} alt="no_data" className="w-3/6" />
        </div>
      )}
    </div>
  );
}

export default Classes;
