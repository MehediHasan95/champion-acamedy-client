import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { SnackbarSuccess } from "../utilities/Snackbar";

function Profile() {
  const [profile, refetch, isLoading] = useProfile();
  const { _id, displayName, email, photoURL, phone, address, gender, role } =
    !isLoading && profile;
  const [edit, setEdit] = useState(false);
  const [instance] = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    instance.patch(`/profile/${_id}`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        SnackbarSuccess("Your profile update successfull");
      }
    });
  };

  return (
    <div className="flex justify-center items-center space-x-5 flex-col lg:flex-row w-full lg:w-3/4">
      <div className="p-5">
        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-royalPurple">
          <img src={photoURL} alt="dp" className="w-full h-full object-cover" />
        </div>
        <p className="mt-5 text-center uppercase">{role}</p>
      </div>
      <div className="w-11/12 lg:w-3/12">
        {edit ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                defaultValue={displayName}
                {...register("displayName", { required: true })}
                className="border w-full p-2 mb-3 outline-none"
                placeholder="DisplayName"
                readOnly
              />
              <input
                type="email"
                defaultValue={email}
                {...register("email", { required: true })}
                className="border w-full p-2 mb-3 outline-none"
                placeholder="Email"
                readOnly
              />
              <select
                defaultValue={gender}
                {...register("gender", { required: true })}
                className="border w-full p-2 mb-3 outline-none"
              >
                <option selected disabled>
                  Pick one
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="text"
                defaultValue={phone}
                {...register("phone", { required: true })}
                className="border w-full p-2 mb-3 outline-none"
                placeholder="Phone"
              />
              <input
                type="text"
                defaultValue={address}
                {...register("address", { required: true })}
                className="border w-full p-2 mb-3 outline-none"
                placeholder="Address"
              />
              <div className="flex justify-start space-x-5">
                <button className="bg-green-500 w-2/5 py-2 text-white">
                  <FontAwesomeIcon icon={faCheck} /> Update
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="bg-red-500 w-2/5 py-2 text-white"
                >
                  <FontAwesomeIcon icon={faXmark} /> Cancle
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="my-5">
              <p>Name:</p>
              <p className="text-xl">{displayName}</p>
            </div>
            <div className="my-5">
              <p>Email:</p>
              <p className="text-xl">{email}</p>
            </div>
            <div className="my-5">
              <p>Gender:</p>
              <p className="text-xl">{gender ? gender : "null"}</p>
            </div>
            <div className="my-5">
              <p>Phone:</p>
              <p className="text-xl">{phone ? phone : "null"}</p>
            </div>
            <div className="my-5">
              <p>Address:</p>
              <p className="text-xl">{address ? address : "null"}</p>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="bg-royalPurple w-full py-2 text-white"
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
