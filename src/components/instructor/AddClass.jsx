import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

function AddClass() {
  const { user, create } = useAuth();
  const [instance] = useAxiosSecure();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoader(true);
    const {
      courseName,
      price,
      seats,
      instructorEmail,
      instructorName,
      description,
    } = data;

    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_APP_IMAGE_API_KEY
        }`,
        formData
      )
      .then((res) => {
        const { display_url } = res.data.data;
        if (res.data.success) {
          instance
            .post(`/add-class?uid=${user?.uid}`, {
              courseName,
              price: parseFloat(price),
              seats: parseFloat(seats),
              image: display_url,
              description,
              instructorName,
              instructorEmail,
              create,
            })
            .then((res) => {
              if (res.data.acknowledged) {
                setLoader(false);
                reset();
                enqueueSnackbar("Your class has been successfully added", {
                  variant: "success",
                  autoHideDuration: 3000,
                });
              }
            });
        }
      })
      .catch((err) => {
        setLoader(false);
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div className="my-10">
      <div className="w-11/12 md:w-3/4 lg:w-3/6 mx-auto bg-base-200 p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="w-[49%] mb-3">
              <label>
                <span className="text-sm font-semibold">Class name:</span>
                <input
                  type="text"
                  {...register("courseName", {
                    required: "Class name is required",
                    pattern: {
                      value: /^[a-z A-Z]{0,}$/i,
                      message:
                        "Class name should contain only alphanumeric characters",
                    },
                  })}
                  className="w-full p-3 border-none focus:outline-royalPurple"
                  placeholder="Class name"
                />
              </label>
              <p className="text-red-600 text-xs">
                {errors.courseName && (
                  <span>{errors?.courseName?.message}</span>
                )}
              </p>
            </div>
            <div className="w-[49%] mb-3">
              <label>
                <span className="text-sm font-semibold">Price:</span>
                <input
                  type="text"
                  {...register("price", {
                    required: "Price is required",
                    pattern: {
                      value: /^[0-9]{0,}$/i,
                      message: "Price should contain only numeric number",
                    },
                  })}
                  className="w-full p-3 border-none focus:outline-royalPurple"
                  placeholder="Price"
                />
              </label>
              <p className="text-red-600 text-xs">
                {errors.price && <span>{errors?.price?.message}</span>}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <label>
              <span className="text-sm font-semibold">Number of seats:</span>
              <input
                type="text"
                {...register("seats", {
                  required: "Seats is required",
                  pattern: {
                    value: /^[0-9]{0,}$/i,
                    message: "Seats should contain only numeric number",
                  },
                })}
                className="w-full p-3 border-none focus:outline-royalPurple"
                placeholder="Number of seats"
              />
            </label>
            <p className="text-red-600 text-xs">
              {errors.seats && <span>{errors?.seats?.message}</span>}
            </p>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Instructor name:</span>
              <input
                type="text"
                defaultValue={user && user?.displayName}
                {...register("instructorName", { required: true })}
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Instructor name"
                readOnly
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Instructor email:</span>
              <input
                type="email"
                defaultValue={user && user?.email}
                {...register("instructorEmail", { required: true })}
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Instructor email"
                readOnly
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Class Image:</span>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input rounded-none w-full mb-3 border-none"
                accept="image/*"
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              <span className="text-sm font-semibold">Description:</span>
              <textarea
                type="text"
                rows="5"
                {...register("description", {
                  required: "Description is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{0,}$/g,
                    message:
                      "Description should contain only alphanumeric characters",
                  },
                })}
                className="w-full p-3 border-none focus:outline-royalPurple"
                placeholder="Class description"
              />
            </label>
            <p className="text-red-600 text-xs">
              {errors.description && (
                <span>{errors?.description?.message}</span>
              )}
            </p>
          </div>
          <button className="w-full p-3 border-none outline-none bg-royalPurple text-white uppercase">
            {loader ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Add Class"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
