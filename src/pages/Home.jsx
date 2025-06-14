import Carousel from "../components/Carousel";
import FeaturedJobs from "../components/FeaturedJobs";
import Footer from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import Navbar from "../components/Navbar";
import OurNumbers from "../components/OurNumbers";

const Home = ({}) => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Carousel />
      <FeaturedJobs />
      <OurNumbers />
      <Footer />
    </div>
  );
};

export default Home;
