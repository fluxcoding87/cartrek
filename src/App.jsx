import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import ProfilePage from "./pages/Profile";
import AddListingPage from "./pages/AddListing";
import { Toaster } from "./components/ui/sonner";
import SearchCategoryPage from "./pages/SearchCategory";
import SearchCategoryLayout from "./pages/SearchCategoryLayout";
import SearchByOptionsPage from "./pages/SearchByOptions";
import ListingDetailsPage from "./pages/ListingDetails";
import NewCarsPage from "./pages/NewCars";
import UsedCarsPage from "./pages/UsedCars";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "add-listing",
        element: <AddListingPage />,
      },
      {
        path: "search/:category",
        element: <SearchCategoryLayout />,
        children: [
          {
            index: true,
            element: <SearchCategoryPage />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchCategoryLayout />,
        children: [
          {
            index: true,
            element: <SearchByOptionsPage />,
          },
        ],
      },
      {
        path: "/listing-details/:id",
        element: <ListingDetailsPage />,
      },
      {
        path: "/new",
        element: <NewCarsPage />,
      },
      {
        path: "/used",
        element: <UsedCarsPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} /> <Toaster />
    </>
  );
}
