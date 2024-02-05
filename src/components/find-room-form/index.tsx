import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import Button from "../ui/button";
import { useGetLocationsQuery } from "../../api/public-api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setHotelFilter } from "../../redux/hotel-filter-slice";
import { useLocation, useNavigate } from "react-router-dom";
import formatDateToYYYYMMDD from "../../utils/format-date-to-YYYYMMDD";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import "./FindRoomForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const TravellersInput = ({ control, setValue, watch }: any) => {
  const [isTravelersPopupOpen, setIsTravelersPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const toggleTravelersPopup = () => {
    setIsTravelersPopupOpen((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsTravelersPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const adultCount = watch("travelers.adult") || 1;
  const childCount = watch("travelers.child") || 0;
  const roomCount = watch("travelers.rooms") || 1;

  return (
    <div className="flex-grow relative">
      <div className="relative" ref={popupRef}>
        <div
          className="flex items-center  w-full cursor-pointer rounded-lg px-3 py-3 border-4 border-yellow-500 bg-white"
          onClick={toggleTravelersPopup}
        >
          {/* Font Awesome Icon for Calendar */}
          <FontAwesomeIcon
            icon={faBed}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
          />
          {`${adultCount} Adult${
            adultCount > 1 ? "s" : ""
          }, ${childCount} Child${
            childCount > 1 ? "ren" : ""
          }, ${roomCount} Room${roomCount > 1 ? "s" : ""}`}
          {/* Custom arrow icon */}
          <div className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        {isTravelersPopupOpen && (
          <div className="absolute top-full left-0 bg-white border border-gray-300 p-4 rounded-md shadow-md">
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium text-gray-600 mb-1 mr-2">
                Adults:
              </label>
              <button
                type="button"
                onClick={() => setValue("travelers.adult", adultCount + 1)}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 mr-2 ml-auto"
              >
                +
              </button>
              <span className="text-lg font-semibold">{adultCount}</span>
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "travelers.adult",
                    adultCount > 1 ? adultCount - 1 : 1
                  )
                }
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 mr-2 ml-auto"
              >
                -
              </button>
            </div>
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium text-gray-600 mb-1 mr-2">
                Children:
              </label>
              <button
                type="button"
                onClick={() => setValue("travelers.child", childCount + 1)}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 mr-2 ml-auto"
              >
                +
              </button>
              <span className="text-lg font-semibold">{childCount}</span>
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "travelers.child",
                    childCount > 0 ? childCount - 1 : 0
                  )
                }
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 ml-2"
              >
                -
              </button>
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-600 mb-1 mr-2">
                Rooms:
              </label>
              <button
                type="button"
                onClick={() => setValue("travelers.rooms", roomCount + 1)}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 mr-2"
              >
                +
              </button>
              <span className="text-lg font-semibold">{roomCount}</span>
              <button
                type="button"
                onClick={() =>
                  setValue("travelers.rooms", roomCount > 1 ? roomCount - 1 : 1)
                }
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 ml-2"
              >
                -
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FindRoomForm = () => {
  const locationURL = useLocation();
  const navigate = useNavigate();

  const { isLoading, data: locations = {} } = useGetLocationsQuery(undefined);
  const hotelFilter = useAppSelector((state) => state.hotelFilter);
  const dispatch = useAppDispatch();

  const filterLocations = Object.entries(locations)
    .map(([address, count]) => ({
      address,
      count: `${address} (${count})`,
    }))
    .sort((a, b) => a.address.localeCompare(b.address));

  const { control, handleSubmit, watch, setValue } = useForm({
    mode: "all",
    defaultValues: {
      location: hotelFilter.location,
      dateRange: hotelFilter.dateRange,
      travelers: hotelFilter.travelers || { adult: 1, child: 0, rooms: 1 },
    },
  });

  const onSubmit = (data: any) => {
    dispatch(setHotelFilter(data));
    if (locationURL.pathname === "/") {
      navigate("/hotel");
    }
  };

  const checkInMinDate = formatDateToYYYYMMDD();

  let currentCheckIn = new Date(watch("dateRange.start") || checkInMinDate);
  const day = currentCheckIn.getDate();
  currentCheckIn.setDate(day + 1);
  const checkOutMinDate = formatDateToYYYYMMDD(currentCheckIn);

  const datePlaceholder =
    watch("dateRange.start") && watch("dateRange.end")
      ? `${formatDateToYYYYMMDD(
          watch("dateRange.start")
        )} - ${formatDateToYYYYMMDD(watch("dateRange.end"))}`
      : "Select Check-in and Check-out Dates";

  return (
    <div className="bg-white p-3 rounded-md max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold  text-center block md:hidden">
        Find Your Room
      </h2>
      <hr className="border-t border-gray-300 my-2 block md:hidden" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center justify-center gap-3"
      >
        {/* Location Dropdown */}
        <div className="flex-grow md:mb-0 w-4/5 md:w-1/4">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="relative">
                <select
                  id="location"
                  {...field}
                  className="py-3 w-full md:w-80 appearance-none pl-4 pr-8  rounded-md border-4 border-yellow-500"
                  placeholder="Choose a Location"
                >
                  {isLoading ? (
                    <option value="">Choose a Location</option>
                  ) : (
                    <>
                      <option value="">Choose a Location</option>
                      {filterLocations &&
                        filterLocations?.map((location) => (
                          <option
                            key={location.address}
                            value={location.address}
                          >
                            {location.count}
                          </option>
                        ))}
                    </>
                  )}
                </select>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            )}
            name="location"
          />
        </div>

        {/* Date Picker */}
        <div className="flex-grow md:mb-0 w-4/5 md:w-1/4 mx-auto border-4 border-yellow-500 md:border-0 rounded-md">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="relative">
                <DatePicker
                  {...field}
                  selectsRange
                  startDate={watch("dateRange.start")}
                  endDate={watch("dateRange.end")}
                  onChange={(dates: [Date, Date]) => {
                    setValue("dateRange.start", dates[0]);
                    setValue("dateRange.end", dates[1]);
                  }}
                  minDate={new Date()}
                  className="py-3 w-auto md:w-80 appearance-none pl-4 pr-8 rounded-md text-base border-0 md:border-4 border-yellow-500"
                  placeholderText="Check-in - Check-out Dates"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "-2px 0 0 8px",
                    },
                  }}
                />
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            )}
            name="dateRange"
          />
        </div>

        {/* Travellers Input */}
        <div className="flex-grow md:mb-0 w-4/5 md:w-1/4">
          <TravellersInput
            control={control}
            setValue={setValue}
            watch={watch}
          />
        </div>
        <div className="flex-shrink-0  w-4/5 md:w-36 bg-white">
          <Button
            type={"submit"}
            className="relative text-base w-full md:w-36 py-3 border-4 border-yellow-500 "
          >
            Search
          </Button>
        </div>

        {/* Search Button */}
      </form>
    </div>
  );
};

export default FindRoomForm;
