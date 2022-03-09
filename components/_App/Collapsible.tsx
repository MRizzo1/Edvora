import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

interface CollapsibleProps {
  textButton: string;
  children?: React.ReactChild | React.ReactChild[];
}

export default function Collapsible({
  textButton,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-['Inter'] text-[16px] leading-[19px] text-white align-middle"
        type="button"
      >
        <FontAwesomeIcon icon={faBars} className="text-white mr-2" /> {textButton} 
      </button>

      <div className={`absolute right-2  ${open ? "" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}
