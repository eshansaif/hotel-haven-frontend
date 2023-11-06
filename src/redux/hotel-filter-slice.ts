import {createSlice} from "@reduxjs/toolkit";

const hotelFilterSlice = createSlice({
  name: "hotel-filter",
  initialState: {
    location: "",
    checkIn: "",
    checkOut: "",
  },
  reducers: {
    setHotelFilter: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const {setHotelFilter} = hotelFilterSlice.actions;

export default hotelFilterSlice.reducer;