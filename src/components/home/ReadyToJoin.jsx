import { parallax } from "../utilities/utils";

const ReadyToJoin = () => {
  return (
    <div className="my-32">
      <div
        className="h-64 grid place-items-center my-20 relative bg-fixed bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url("${parallax}")` }}
      >
        <div className="text-center text-white space-y-3">
          <h1 className="text-xl lg:text-3xl font-bold uppercase">
            Ready To Get Join?
          </h1>
          <p className="text-xs lg:text-base">
            Welcome to our Champion Academy center. Sore today, <br /> stronger
            tomorrow, Improve your sports knowlage today.
          </p>
          <div className="space-x-3">
            <button className="px-4 py-1 lg:py-2 border">Learn More</button>
            <button className="px-4 py-1 lg:py-2 bg-white text-black">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToJoin;
