import {
  faChair,
  faMoneyBillWave,
  faShoppingBasket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRole from "../../hooks/useRole";

function ClassesCard({ allClasses, handleAddToCart }) {
  const {
    courseName,
    image,
    instructorImage,
    instructorName,
    price,
    seats,
    enroll,
  } = allClasses;
  const [role, isLoading] = useRole();

  return (
    <div
      className={`col-span-1 hover:shadow flex overflow-hidden ${
        seats > 0 ? "bg-base-300" : "bg-red-100"
      }`}
    >
      <div className="w-36 h-52">
        <img
          src={image}
          alt="class_photo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-3 grid content-between">
        <h1 className="font-semibold">{courseName}</h1>
        <div className="flex items-center space-x-2">
          <img
            src={instructorImage}
            alt="instructor_image"
            className="w-8 h-8 rounded-full"
          />
          <p className="leading-3">
            {instructorName}
            <br />
            <small className="text-xs font-light">Instructor</small>
          </p>
        </div>
        <div className="flex justify-between">
          <p>
            <span className="text-royalPurple font-semibold me-2">
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </span>
            ${price}
          </p>

          <div className="flex space-x-5">
            <p>
              <span
                className="text-royalPurple font-semibold me-2 tooltip"
                data-tip="Enroll"
              >
                <FontAwesomeIcon icon={faUserGroup} />
              </span>
              {enroll}
            </p>
            <p>
              <span
                className="text-royalPurple font-semibold me-2 tooltip"
                data-tip="Seats"
              >
                <FontAwesomeIcon icon={faChair} />
              </span>
              {seats}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleAddToCart(allClasses)}
          className={`w-full py-1 uppercase text-sm ${
            !isLoading && role?.role === "student" && seats > 0
              ? "bg-royalPurple hover:bg-deepRoyalPurple text-white"
              : (isLoading && !role && seats === 0) || role
              ? "text-red-500"
              : "bg-royalPurple hover:bg-deepRoyalPurple text-white"
          }`}
          disabled={
            role?.role === "student" && seats > 0
              ? false
              : (isLoading && !role && seats === 0) || role
              ? true
              : false
          }
        >
          <FontAwesomeIcon
            icon={seats > 0 ? faShoppingBasket : faChair}
            className="me-2"
          />
          {seats > 0 ? "Add to Cart" : "Seats Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default ClassesCard;
