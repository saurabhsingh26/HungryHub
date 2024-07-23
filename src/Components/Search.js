import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CDN_URL, SUGGESTION } from "../utils/constants";
import SearchCuisines from "../utils/SearchCuisines";
import FixedFooter from "./FixedFooter";
// import axios from "axios";

const Search = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // console.log("suggestions", suggestions);
  const navigate = useNavigate();
  const getRestInfo = async (metaData) => {
    const metadataJson = JSON.parse(metaData);
    // const { data } = await axios(`${RESTAURANT_INFO}` + metaData);
    // console.log("data", data);
    // const { id } =
    //   data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.[0]
    //     ?.card?.card?.info;
    const id = metadataJson?.data?.primaryRestaurantId;
    navigate(`/restaurant/${id}`);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      const data = await fetch(`${SUGGESTION}${value}`);
      // console.log('Hitted');
      const json = await data.json();
      setSuggestions(
        json?.data?.suggestions.filter((sug) => sug.type === "RESTAURANT")
      );
    };

    const debounce = setTimeout(() => {
      getSuggestions();
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  const handleClick = (text) => {
    setValue(text);
  };

  return (
    <>
      <div className="min-h-[100vh] w-[80%] mx-auto">
        <div className="my-10">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="p-3 w-[100%] outline-none border rounded"
            type="text"
            value={value}
            placeholder="Search for restaurants and foods"
          />
        </div>

        <div>
          {suggestions ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex ml-4 my-4 cursor-pointer"
                onClick={() => {
                  if (suggestion?.tagToDisplay === "Restaurant") {
                    getRestInfo(suggestion?.metadata);
                  }
                }}
              >
                <div>
                  <img
                    className="w-16 h-16 rounded-lg"
                    src={`${CDN_URL}/${suggestion.cloudinaryId}`}
                    alt={suggestion.text}
                  />
                </div>
                <div className="flex flex-col justify-center px-5">
                  <div
                    style={{ color: "#282C3F" }}
                    className="text-sm font-medium"
                  >
                    {suggestion.text}
                  </div>
                  <div style={{ color: "#7E808C" }} className="text-sm">
                    {suggestion.type}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col">
              <div
                style={{ color: "#3D4152" }}
                className="text-xl font-bold my-4"
              >
                Popular Cuisines
              </div>
              <div className="flex overflow-x-auto">
                {SearchCuisines.map((cuisine) => (
                  <div
                    key={cuisine.id}
                    className="min-w-[50px] min-h-[80px] lg:min-w-[144px] lg:min-h-[180px]"
                    onClick={() => handleClick(cuisine.action.text)}
                  >
                    <img
                      className="cursor-pointer"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${cuisine.imageId}`}
                      alt={cuisine.action.text}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <FixedFooter />
    </>
  );
};

export default Search;
