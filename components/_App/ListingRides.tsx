interface ListingRidesProps {
  data: {
    id: number;
    origin_station_code: number;
    station_path: never[];
    destination_station_code: number;
    date: string;
    map_url: string;
    state: string;
    city: string;
  };
  userData: {
    station_code: number;
    name: string;
    url: string;
  };
}

export default function ListingRides({ data, userData }: ListingRidesProps) {
  return (
    <>
      <div className="flex items-center text-white bg-[#171717] rounded-md my-4 mx-8 p-5 h-max">
        <div className="pl-3 w-full flex">
          <img
            src={data.map_url}
            alt={data.city}
            className="w-auto rounded-md inline mr-10"
          />{" "}
          <ul className="align-top">
            <li>
              Ride Id: <span className="font-bold">{data.id}</span>
            </li>
            <li>
              Origin Station:{" "}
              <span className="font-bold">{data.origin_station_code}</span>
            </li>
            <li>
              station_path:{" "}
              <span className="font-bold">
                [{" "}
                {data.station_path.map((station: number, index) =>
                  index != data.station_path.length - 1
                    ? station.toString() + ", "
                    : station.toString()
                )}{" "}
                ]
              </span>
            </li>
            <li>
              Date: <span className="font-bold">{data.date}</span>
            </li>
            <li>
              Distance:{" "}
              <span className="font-bold">
                {Math.min(
                  ...data.station_path.map((station: number, index) =>
                    Math.abs(station - userData.station_code)
                  )
                )}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex items-start h-52">
          <span className="bg-[#101010] rounded-lg px-4 font-['Inter'] text-[12px] font-medium leading-[24px] text-white w-fit inline mr-4 align-top align-center">
            {data.city}
          </span>
          <span className="bg-[#101010] rounded-lg px-4 font-['Inter'] text-[12px] font-medium leading-[24px] text-white w-fit inline align-top align-center">
            {data.state}
          </span>
        </div>
      </div>
    </>
  );
}
