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
      <div>
        <div className="md:mx-16">
          <TopLocation />
        </div>
        <div className="md:mx-16">
          <BestHotel />
        </div>
        <div className="md:mx-16">
          <HotelGallery />
        </div>
        <div className="md:mx-16">
          <BestBlogs />
        </div>
        <div>
          <CustomerReviews />
        </div>
      </div>
    </Main>
  );
};

export default Home;
