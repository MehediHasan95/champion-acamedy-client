import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../shared/Heading";

import {
  faEnvelope,
  faFax,
  faLocation,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SnackbarSuccess } from "../utilities/Snackbar";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        "https://b7a12-summer-camp-server-side-mehedi-hasan95.vercel.app/contacts",
        data
      )
      .then(({ data }) => {
        if (data.insertedId) {
          reset();
          SnackbarSuccess("Thanks for your feedback");
        }
      });
  };
  return (
    <div className="max-w-screen-2xl mx-auto px-3 lg:px-0 my-32">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="col-span-1 p-5">
          <Heading title1={"Contact"} title2={"Us"} />
          <div className="space-y-4">
            <div className="w-full lg:w-3/6 mx-auto p-2">
              <p className="font-bold">
                {" "}
                <FontAwesomeIcon icon={faLocation} /> Location
              </p>
              <p>4261 Summit Park Avenue, United States</p>
            </div>
            <div className="w-full lg:w-3/6 mx-auto p-2">
              <p className="font-bold">
                <FontAwesomeIcon icon={faEnvelope} /> Email Address
              </p>
              <p>info@someone.com</p>
            </div>
            <div className="w-full lg:w-3/6 mx-auto p-2">
              <p className="font-bold">
                {" "}
                <FontAwesomeIcon icon={faPhone} /> Phone Number
              </p>
              <p>+91 248-971-0827</p>
            </div>
            <div className="w-full lg:w-3/6 mx-auto p-2">
              <p className="font-bold">
                {" "}
                <FontAwesomeIcon icon={faFax} /> Fax Number
              </p>
              <p>+91 248-971-0827</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-3/4 mx-auto p-5"
          >
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 mb-3 border outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 mb-3 border outline-none"
              placeholder="Email"
            />
            <input
              type="text"
              {...register("subject", { required: true })}
              className="w-full p-3 mb-3 border outline-none"
              placeholder="Subject"
            />
            <textarea
              rows="5"
              {...register("message", { required: true })}
              className="w-full p-3 mb-3 border outline-none"
              placeholder="Type your message"
            />
            <button className="w-1/2 lg:w-1/5 p-3 bg-royalPurple text-white">
              Submit <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
