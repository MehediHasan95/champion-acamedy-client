import {
  faChair,
  faMoneyBillWave,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClassesCard({ allClasses }) {
  console.log(allClasses);
  const {
    courseName,
    image,
    instructorImage,
    instructorName,
    price,
    seats,
    description,
  } = allClasses;

  return (
    <div
      className={`col-span-1 flex shadow overflow-hidden ${
        seats > 0 ? "bg-royalPurple bg-opacity-10" : "bg-platinum bg-opacity-20"
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
        <p className="text-xs my-2">{description.slice(0, 100) + "..."}</p>

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
          <p>
            <span className="text-royalPurple font-semibold me-2">
              <FontAwesomeIcon icon={faChair} />
            </span>
            {seats}
          </p>
        </div>
        <button className="bg-royalPurple text-white w-full py-1">
          <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ClassesCard;
