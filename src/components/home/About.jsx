import Heading from "../shared/Heading";
import { about_us } from "../utilities/utils";

const About = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 my-32">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="col-span-1">
          <img
            src={about_us}
            alt="about_us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 space-y-4 p-5">
          <Heading title1={"About"} title2={"Us"} />
          <p>
            Welcome to Champion Academy, your premier destination for sports
            education and training! At Champion Academy, we are dedicated to
            fostering the growth and development of athletes, both aspiring and
            experienced, by providing a dynamic and accessible platform for
            sports enthusiasts to connect, learn, and excel.
          </p>
          <p className="font-bold">Our Mission</p>
          <p>
            Our mission is simple yet powerful: to empower individuals to become
            champions in their chosen sports. Whether you're a beginner looking
            to learn the basics or an advanced athlete striving to hone your
            skills, Champion Academy is your ultimate guide to success.
          </p>
          <p className="font-bold">Our Commitment</p>
          <p>
            At Champion Academy, we are committed to providing high-quality
            sports education that is accessible to everyone. We strive to create
            an inclusive and welcoming environment where athletes of all
            backgrounds can come together to pursue their dreams and
            aspirations.
          </p>
          <button className="w-1/2 lg:w-1/5 py-1 lg:py-2 bg-royalPurple hover:bg-deepRoyalPurple text-base-100 dark:text-base-content">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
