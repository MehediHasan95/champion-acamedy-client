import useTitle from "../../hooks/useTitle";
import About from "./About";
import AdvantageLearning from "./AdvantageLearning";
import BannerSlider from "./BannerSlider";
import Contact from "./Contact";
import OurBlogs from "./OurBlogs";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import ReadyToJoin from "./ReadyToJoin";
import Reviews from "./Reviews";

function Home() {
  useTitle("Home");
  return (
    <div>
      <BannerSlider />
      <PopularClasses />
      <PopularInstructors />
      <AdvantageLearning />
      <OurBlogs />
      <About />
      <Contact />
      <ReadyToJoin />
      <Reviews />
    </div>
  );
}

export default Home;
