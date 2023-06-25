import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignupPage from "./screens/signupPage/SignupPage";
import AnimeListPage from "./screens/animeListPage/AnimeListPage";
import MangaListPage from "./screens/mangaListPage/MangaListPage";
import CharacterPage from "./screens/characterPage/CharacterPage/CharacterPage";
import AnimePage from "./screens/animepage/AnimePage/AnimePage";
import ProfilePage from "./screens/profile/ProfilePage";
import React from "react";
import LandingPage from "./screens/landingpage/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import EditProfilePage from "./screens/editProfilePage/EditProfilePage/EditProfilePage";
import MangaPage from "./screens/mangaPage/MangaPage/MangaPage";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Error from "./components/Error/Error";
import StaffPage from "./screens/staffPage/StaffPage";
import UserReviewsPage from "./screens/userReviewsPage/UserReviewsPage/UserReviewsPage";
import EntryReviewsPage from "./screens/EntryReviewsPage/EntryReviewsPage/EntryReviewsPage";
import FriendRequestsPage from "./screens/friendRequestsPage/FriendRequestsPage/FriendRequestsPage";
import ScrollUp from "./components/ScrollUp/ScrollUp";
import AdvancedSearchPage from "./screens/AdvancedSearchPage/AdvancedSearchPage";
// import Footer from "./components/Footer/Footer";

function App() {
  const userCache = JSON.parse(sessionStorage.getItem("userCache"));
  !userCache && sessionStorage.setItem("userCache", JSON.stringify({}));
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollUp />
        <ErrorBoundary>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/signup/*" exact element={<SignupPage />} />
            <Route
              path="/search"
              exact
              element={<Navigate to="/search/anime/*" />}
              replace
            />
            <Route
              path="/search/anime/*"
              exact
              element={<AdvancedSearchPage type={"anime"} />}
            />
            <Route
              path="/search/manga/*"
              exact
              element={<AdvancedSearchPage type={"manga"} />}
            />
            <Route
              path="/search/character/*"
              exact
              element={<AdvancedSearchPage type={"character"} />}
            />
            <Route
              path="/search/staff/*"
              exact
              element={<AdvancedSearchPage type={"staff"} />}
            />
            {/* <Route
              path="/search/anime/trending"
              exact
              element={
                <AdvancedSearchPage type={"anime"} catagory={"trending"} />
              }
            />
            <Route
              path="/search/anime/popular"
              exact
              element={
                <AdvancedSearchPage type={"anime"} catagory={"popular"} />
              }
            />
            <Route
              path="/search/anime/this-season"
              exact
              element={
                <AdvancedSearchPage type={"anime"} catagory={"this-season"} />
              }
            />
            <Route
              path="/search/anime/next-season"
              exact
              element={
                <AdvancedSearchPage type={"anime"} catagory={"next-season"} />
              }
            />
            <Route
              path="/search/anime/top"
              exact
              element={<AdvancedSearchPage type={"anime"} catagory={"top"} />}
            />
            <Route
              path="/search/manga/top"
              exact
              element={<AdvancedSearchPage type={"manga"} catagory={"top"} />}
            />
            <Route
              path="/search/character/favorite"
              exact
              element={
                <AdvancedSearchPage type={"character"} catagory={"favorite"} />
              }
            /> */}
            <Route
              path="/profile/:username/*"
              exact
              element={<ProfilePage />}
            />
            <Route
              path="/:username/animelist/*"
              exact
              element={<AnimeListPage />}
            />
            <Route
              path="/:username/mangalist/*"
              exact
              element={<MangaListPage />}
            />
            <Route
              path="/:username/editprofile/*"
              exact
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/anime/:id/*" exact element={<AnimePage />} />
            <Route path="/manga/:id/*" exact element={<MangaPage />} />
            <Route path="/character/:id/*" exact element={<CharacterPage />} />
            <Route path="/staff/:id/*" exact element={<StaffPage />} />
            <Route
              path="/profile/:username/reviews/*"
              exact
              element={<UserReviewsPage />}
            />
            <Route
              path="/anime/:id/reviews/*"
              exact
              element={<EntryReviewsPage />}
            />
            <Route
              path="/manga/:id/reviews/*"
              exact
              element={<EntryReviewsPage />}
            />
            <Route
              path="profile/:username/notifications/*"
              exact
              element={
                <PrivateRoute>
                  <FriendRequestsPage />
                </PrivateRoute>
              }
            />
            <Route path="/notfound/*" exact element={<NotFound />} />
            <Route path="/error/*" exact element={<Error />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </ErrorBoundary>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
