import AdvantageLearning from "./AdvantageLearning";
import BannerSlider from "./BannerSlider";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

function Home() {
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
