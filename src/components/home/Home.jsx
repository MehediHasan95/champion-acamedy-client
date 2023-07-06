import useTitle from "../../hooks/useTitle";
import AdvantageLearning from "./AdvantageLearning";
import BannerSlider from "./BannerSlider";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

function Home() {
  useTitle("Home");
  return (
    <div>
      <BannerSlider />
      <PopularClasses />
      <PopularInstructors />
      <AdvantageLearning />
    </div>
  );
}

export default Home;
