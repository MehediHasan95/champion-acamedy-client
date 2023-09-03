import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@smastrom/react-rating";
import { Carousel } from "react-responsive-carousel";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    review:
      "I love playing basketball! It's a great way to stay active and improve my skills.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alice Smith",
    review:
      "Soccer is my passion, and this new soccer ball is fantastic. It's durable and has great ball control.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Michael Johnson",
    review:
      "I recently started swimming as a fitness routine. The pool facilities here are top-notch.",
    rating: 4,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    review:
      "I enjoy watching tennis matches, and the last tournament was thrilling!",
    rating: 4.8,
  },
  {
    id: 5,
    name: "David Brown",
    review:
      "I'm a fan of baseball, and this stadium offers a great atmosphere for the games.",
    rating: 4.2,
  },
];

const Reviews = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 lg:px-0 my-32">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        transitionTime={800}
      >
        {reviews.map(({ id, name, review, rating }) => (
          <div key={id} className="space-y-2">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="text-9xl text-royalPurple"
            />
            <p>-{name}-</p>
            <h1>{review}</h1>
            <div className="flex justify-center">
              Rating - {rating} (
              <Rating style={{ maxWidth: 100 }} value={rating} readOnly />)
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
