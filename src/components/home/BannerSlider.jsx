import { Carousel } from "react-responsive-carousel";
import football from "../../assets/banner/football.png";
import cricket from "../../assets/banner/cricket.png";
import tabletennis from "../../assets/banner/table-tennis.png";
import badminton from "../../assets/banner/badminton.png";

function BannerSlider() {
  const data = [
    {
      title: "Excuses are the tools of the incompetent.",
      quotes:
        "Scoring a goal is a great feeling, but the most important thing to me is that the team is successful.",
      img: football,
    },
    {
      title: "Cricket is a Gentleman’s Game.",
      quotes: "You don’t play for the crowd, You Play for the Country.",
      img: cricket,
    },
    {
      title: "Championships are won at practice.",
      quotes:
        "It is never too late for one to commence or too earlier to start getting better at Table Tennis.",
      img: tabletennis,
    },
    {
      title: "I love badminton. That’s my sport.",
      quotes:
        "In badminton, they use a lot from the wrist. But I use a lot from the shoulder.",
      img: badminton,
    },
  ];

  return (
    <div>
      <Carousel
        dynamicHeight={"false"}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        transitionTime={800}
      >
        {data.map((e, index) => (
          <div key={index} className="min-h-90 grid grid-cols-2 p-5">
            <div className="col-span-1 grid place-items-center text-left">
              <div className="lg:w-3/4">
                <h1 className="font-dmSerif text-xl md:text-5xl lg:text-7xl font-bold">
                  {e.title}
                </h1>
                <p className="my-3 text-xs  md:text-base lg:text-base">
                  {e.quotes}
                </p>
                <button className="w-1/2 lg:w-1/5 py-2 bg-royalPurple hover:bg-deepRoyalPurple text-base-100 dark:text-base-content">
                  Get Started
                </button>
              </div>
            </div>
            <div className="col-span-1 w-10/12 lg:w-3/5 mx-auto">
              <img src={e.img} alt="banner_image" className="w-full" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerSlider;
