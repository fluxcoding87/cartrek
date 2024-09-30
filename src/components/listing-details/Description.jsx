/* eslint-disable react/prop-types */
export default function Description({ carDescription }) {
  return (
    <div>
      {carDescription ? (
        <div className="p-10 rounded-xl bg-white shadow-md mt-6 border">
          <h2 className="my-2 font-semibold text-2xl">Description</h2>
          <p>{carDescription}</p>
        </div>
      ) : (
        <div className="w-full h-[100px] bg-slate-300 animate-pulse rounded-xl mt-7"></div>
      )}
    </div>
  );
}
