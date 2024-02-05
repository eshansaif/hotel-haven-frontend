import Main from "../../layout/main";
import Banner from "./Banner";
import BestBlogs from "./BestBlogs";
import BestHotel from "./BestHotel";
import CustomerReviews from "./customer-reviews";
import HotelGallery from "./hotel-gallery";
import TopLocation from "./top-location/TopLocation";
import SetTitle from "../../components/set-title";

const Home = () => {
  return (
    <Main>
      <SetTitle title="Welcome To Our Home" />
      <Banner />
      <div className="md:mx-16">
        <TopLocation />
        <BestHotel />
        <HotelGallery />
        <BestBlogs />
        {/* <CustomerReviews /> */}
      </div>
    </Main>
  );
};

export default Home;
