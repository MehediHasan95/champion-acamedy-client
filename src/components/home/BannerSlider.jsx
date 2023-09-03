import { Carousel } from "react-responsive-carousel";

import { cricket, football, golf, tabletennis } from "../utilities/utils";

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
      img: golf,
    },
  ];

  return (
    <div className="pt-16 lg:pt-0">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        transitionTime={100}
      >
        {data.map((e, index) => (
          <div
            key={index}
            className="relative bg-fixed bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url("${e.img}")` }}
          >
            <div className="min-h-[30vh] lg:min-h-screen grid grid-cols-3 p-5 max-w-screen-2xl mx-auto">
              <div className="col-span-2 grid place-items-center text-left">
                <div className="text-white">
                  <h1 className="font-dmSerif text-xl md:text-5xl lg:text-8xl font-bold uppercase">
                    {e.title}
                  </h1>
                  <p className="my-3 text-xs  md:text-base lg:text-base">
                    {e.quotes}
                  </p>
                  <button className="w-1/2 lg:w-1/5 py-1 lg:py-2 bg-royalPurple hover:bg-deepRoyalPurple text-base-100 dark:text-base-content">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="col-span-1 grid place-items-center">
                {/* <img src={e.img} alt="banner_image" className="w-full" /> */}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerSlider;
