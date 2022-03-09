import { useRouter } from "next/router";
import { useState } from "react";
import Collapsible from "./Collapsible";
import Dropdown from "./Dropdown";

interface FiltersProps {
  menuItems: {
    label: string;
    selectedFilter: any;
    isActive: boolean[];
  }[];
  dropdowns: {
    label: string;
    selectElement: any;
    elements: string[];
  }[];
}

export default function Filters({ menuItems, dropdowns }: FiltersProps) {
  const [activeFilter, setActiveFilter] = useState([true, false, false]);
  return (
    <>
      <div className="flex items-start flex-wrap bg-transparent py-3 px-8">
        <div className="w-full lg:inline-flex  lg:w-auto">
          {menuItems.map((menuItem, index) => (
            <div
              className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full items-start flex flex-col lg:h-auto"
              key={index}
            >
              <button
                onClick={() => {
                  menuItem.selectedFilter();
                  setActiveFilter(menuItem.isActive);
                }}
                className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-['Inter'] text-[18px] leading-[21px] text-white align-middle  ${
                  activeFilter[index]
                    ? "font-bold underline"
                    : "hover:font-bold font-normal"
                }`}
              >
                {menuItem.label}
              </button>
            </div>
          ))}
        </div>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <Collapsible textButton={"Filters"}>
              <div className="bg-[#131313] rounded-lg p-4 w-52 h-fit">
                <div className="border-b-2 border-[#A5A5A5] w-full">
                  <span className=" font-['SF_Pro_Display'] text-[20px] leading-[24px] text-[#A5A5A5] font-light">
                    Filters
                  </span>
                </div>
                {dropdowns.map((dropdown, index) => (
                  <div key={index}>
                    <Dropdown
                      textDropdown={dropdown.label}
                      elements={dropdown.elements}
                      selectElementSelected={dropdown.selectElement}
                    />
                  </div>
                ))}
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </>
  );
}
