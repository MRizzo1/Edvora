import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  textDropdown: string;
  elements: string[];
  selectElementSelected: any;
}

export default function Dropdown({
  textDropdown,
  elements,
  selectElementSelected,
}: DropdownProps) {
  const [elementSelected, setElementSelected] = useState("");

  return (
    <div className="my-2">
      <Menu as="div">
        <div>
          <Menu.Button className="inline-flex justify-between font-['Inter'] align-left w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opaElementSelected-20 hover:bg-opaElementSelected-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opaElementSelected-75">
            {elementSelected == "" ? textDropdown : elementSelected}{" "}
            <FontAwesomeIcon icon={faChevronDown} className="text-white" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opaElementSelected-0 scale-95"
          enterTo="transform opaElementSelected-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opaElementSelected-100 scale-100"
          leaveTo="transform opaElementSelected-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opaElementSelected-5 focus:outline-none max-h-96 overflow-y-scroll ">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    value={""}
                    onClick={(e) => {
                      selectElementSelected(e.currentTarget.value);
                      setElementSelected(e.currentTarget.value);
                    }}
                    className={`font-['Inter'] ${
                      active ? "bg-[#232323] text-white" : "text-gray-900"
                    } group flex rounded-md w-full px-2 py-2 text-sm`}
                  >
                    All
                  </button>
                )}
              </Menu.Item>
              {elements.map((element, index) => (
                <div key={index}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        value={element}
                        onClick={(e) => {
                          selectElementSelected(e.currentTarget.value);
                          setElementSelected(e.currentTarget.value);
                        }}
                        className={`font-['Inter'] ${
                          active ? "bg-[#232323] text-white" : "text-gray-900"
                        } group flex rounded-md w-full px-2 py-2 text-sm`}
                      >
                        {element}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
