import Search from "../components/Search";
import { Outlet } from "react-router-dom";

export default function SearchCategoryLayout() {
  return (
    <>
      <div className="p-16 bg-black flex justify-center items-center">
        <Search />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
