import Container from "../../../components/ui/container";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { useGetHotelReviewTopQuery } from "../../../api/public-api";
import CustomerReviewsSkeleton from "./CustomerReviewsSkeleton";

interface CustomerReviews {
  _id: number;
  name: string;
  review: string;
  rating: number;
  profileURL: string;
}

const CustomerReviews: React.FC = () => {
  const { data: reviews, isLoading } = useGetHotelReviewTopQuery(undefined);

  return (
    <div
      className="bg-cover bg-no-repeat bg-center max-h-[400px] md:max-h-[750px] relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54587.jpg')",
      }}
    >
      <Container className="lg:my-20 overflow-hidden">
        <div className="mx-auto text-center py-4 md:mb-8">
          <h2 className="uppercase text-white font-OpenSans">
            {" "}
            Customer Reviews
          </h2>
          <p className="text-center text-white font-OpenSans">
            Discover what our customers have to say about their experiences with
            our products.
          </p>
        </div>
        {isLoading ? (
          <CustomerReviewsSkeleton />
        ) : (
          <div
            style={{ cursor: "grab" }}
            className="transition-transform duration-500 transform translate-y-0"
          >
            <Swiper
              spaceBetween={30}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },

                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              <div className="transition-transform duration-500 transform translate-y-0">
                {reviews?.slice(0, 15).map((review: any) => (
                  <SwiperSlide
                    key={review._id}
                    className="bg-white p-4 rounded-lg shadow-md  dark:bg-secondary-800 dark:border-secondary-800"
                    data-aos="fade-up"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={review.userProfile}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-3">
                        <h3 className="text-xl font-semibold">
                          {review.userName}
                        </h3>
                        <div className="flex items-center">
                          <div className="font-semibold font-mono text-lg">
                            <Rating
                              value={review.rating}
                              readOnly={true}
                              style={{ maxWidth: "100px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-secondary-700 my-auto h-52">
                      <q className="italic font-mono">{review.feedback}</q>
                    </p>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CustomerReviews;
