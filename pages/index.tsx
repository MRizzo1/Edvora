import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";

import Filters from "../components/_App/Filters";
import ListingRides from "../components/_App/ListingRides";
import Navbar from "../components/_App/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home: NextPage = () => {
  //variables and setters
  const [data, setData] = useState<
    {
      id: number;
      origin_station_code: number;
      station_path: never[];
      destination_station_code: number;
      date: string;
      map_url: string;
      state: string;
      city: string;
    }[]
  >([]);
  const [showData, setShowData] = useState<
    {
      id: number;
      origin_station_code: number;
      station_path: never[];
      destination_station_code: number;
      date: string;
      map_url: string;
      state: string;
      city: string;
    }[]
  >([]);
  const [filteredDataFuture, setFilteredDataFuture] = useState<
    {
      id: number;
      origin_station_code: number;
      station_path: never[];
      destination_station_code: number;
      date: string;
      map_url: string;
      state: string;
      city: string;
    }[]
  >([]);
  const [filteredDataPast, setFilteredDataPast] = useState<
    {
      id: number;
      origin_station_code: number;
      station_path: never[];
      destination_station_code: number;
      date: string;
      map_url: string;
      state: string;
      city: string;
    }[]
  >([]);
  const [userData, setUserData] = useState({
    station_code: -1,
    name: "",
    url: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //Client-side data fetching with useEffect
  useEffect(() => {
    setLoading(true);
    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setShowData(data);
        setFilteredDataFuture(
          data.filter(
            (ride: { date: string }) =>
              new Date(ride.date).getTime() > Date.now()
          )
        );
        setFilteredDataPast(
          data.filter(
            (ride: { date: string }) =>
              Date.now() > new Date(ride.date).getTime()
          )
        );
      });
    fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={"bg-[#232323] min-h-screen"}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Navbar userName={userData.name} userPhoto={userData.url} />
          <Filters
            menuItems={[
              {
                label: "Nearest rides",
                selectedFilter: () => setShowData([...data]),
                isActive: [true, false, false],
              },
              {
                label:
                  "Upcoming rides (" +
                  filteredDataFuture.length.toString() +
                  ")",
                selectedFilter: () => setShowData([...filteredDataFuture]),
                isActive: [false, true, false],
              },
              {
                label:
                  "Past rides (" + filteredDataPast.length.toString() + ")",
                selectedFilter: () => setShowData([...filteredDataPast]),
                isActive: [false, false, true],
              },
            ]}
            dropdowns={[
              {
                label: "City",
                selectElement: (citySelected: string) => setCity(citySelected),
                elements: Array.from(
                  new Set(data.map((ride) => ride.city))
                ).sort(function (a, b) {
                  if (a.toLowerCase() < b.toLowerCase()) return -1;
                  if (a.toLowerCase() > b.toLowerCase()) return 1;
                  return 0;
                }),
              },
              {
                label: "State",
                selectElement: (stateSelected: string) =>
                  setState(stateSelected),
                elements: Array.from(
                  new Set(data.map((ride) => ride.state))
                ).sort(function (a, b) {
                  if (a.toLowerCase() < b.toLowerCase()) return -1;
                  if (a.toLowerCase() > b.toLowerCase()) return 1;
                  return 0;
                }),
              },
            ]}
          />

          {city != "" && state == ""
            ? showData
                .sort((a, b) =>
                  Math.min(
                    ...a.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  ) >
                  Math.min(
                    ...b.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  )
                    ? 1
                    : -1
                )
                .filter((ride: { city: string }) => ride.city == city)
                .map(
                  (
                    ride: {
                      id: number;
                      origin_station_code: number;
                      station_path: never[];
                      destination_station_code: number;
                      date: string;
                      map_url: string;
                      state: string;
                      city: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <div key={index}>
                      <ListingRides data={ride} userData={userData} />
                    </div>
                  )
                )
            : city == "" && state != ""
            ? showData
                .sort((a, b) =>
                  Math.min(
                    ...a.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  ) >
                  Math.min(
                    ...b.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  )
                    ? 1
                    : -1
                )
                .filter((ride: { state: string }) => ride.state == state)
                .map(
                  (
                    ride: {
                      id: number;
                      origin_station_code: number;
                      station_path: never[];
                      destination_station_code: number;
                      date: string;
                      map_url: string;
                      state: string;
                      city: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <div key={index}>
                      <ListingRides data={ride} userData={userData} />
                    </div>
                  )
                )
            : city != "" && state != ""
            ? showData
                .sort((a, b) =>
                  Math.min(
                    ...a.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  ) >
                  Math.min(
                    ...b.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  )
                    ? 1
                    : -1
                )
                .filter(
                  (ride: { city: string; state: string }) =>
                    ride.city == city && ride.state == state
                )
                .map(
                  (
                    ride: {
                      id: number;
                      origin_station_code: number;
                      station_path: never[];
                      destination_station_code: number;
                      date: string;
                      map_url: string;
                      state: string;
                      city: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <div key={index}>
                      <ListingRides data={ride} userData={userData} />
                    </div>
                  )
                )
            : showData
                .sort((a, b) =>
                  Math.min(
                    ...a.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  ) >
                  Math.min(
                    ...b.station_path.map((station: number, index) =>
                      Math.abs(station - userData.station_code)
                    )
                  )
                    ? 1
                    : -1
                )
                .map(
                  (
                    ride: {
                      id: number;
                      origin_station_code: number;
                      station_path: never[];
                      destination_station_code: number;
                      date: string;
                      map_url: string;
                      state: string;
                      city: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <div key={index}>
                      <ListingRides data={ride} userData={userData} />
                    </div>
                  )
                )}
        </>
      )}
    </div>
  );
};

export default Home;
