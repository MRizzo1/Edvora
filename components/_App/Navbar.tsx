import Link from "next/link";

interface NavBarProps {
  userName: string;
  userPhoto: string;
}

export default function Navbar({ userName, userPhoto }: NavBarProps) {
  return (
    <>
      <nav className="flex filter drop-shadow-md bg-[#101010] px-8 py-4 h-20 items-center">
        <div className="w-3/12 flex items-center">
          <Link href="/">
            <a className="font-['SF_Pro_Display'] text-[36px] font-bold leading-[43px] text-white">
              Edvora
            </a>
          </Link>
        </div>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full py-2 rounded font-['Inter'] text-[20px] font-bold leading-[24px] text-white items-center">
                <span className="w-full mr-[20px]"> {userName} </span>
                <img
                  src={userPhoto}
                  alt={"Picture of the user"}
                  className="rounded-full h-10 cover"
                />
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
