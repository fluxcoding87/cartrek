import Category from "../components/Category";
import InfoSection from "../components/InfoSection";
import MostSearchCar from "../components/MostSearchCar";
import Search from "../components/Search";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col items-center p-10 py-20 gap-6 h-[40.5rem] w-full bg-[#eef0fc]">
        <h2 className="text-lg">Find cars for sale and rent near you.</h2>
        <h2 className="text-[3.75rem] font-bold">Find your Dream Car</h2>

        <Search />
        <img src="/ferrari.png" alt="ferrari car" className="w-[60%]" />
      </div>
      <Category />
      <MostSearchCar />
      <InfoSection />
    </div>
  );
}
