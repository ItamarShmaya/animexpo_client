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
import PersonPage from "./screens/personPage/PersonPage/PersonPage";
import UserReviewsPage from "./screens/userReviewsPage/UserReviewsPage/UserReviewsPage";
import EntryReviewsPage from "./screens/EntryReviewsPage/EntryReviewsPage/EntryReviewsPage";
import FriendRequestsPage from "./screens/friendRequestsPage/FriendRequestsPage/FriendRequestsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/signup" exact element={<SignupPage />} />
            <Route path="/profile/:username" exact element={<ProfilePage />} />
            <Route
              path="/:username/animelist"
              exact
              element={<AnimeListPage />}
            />
            <Route
              path="/:username/mangalist"
              exact
              element={<MangaListPage />}
            />
            <Route
              path="/:username/editprofile"
              exact
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/anime/:id" exact element={<AnimePage />} />
            <Route path="/manga/:id" exact element={<MangaPage />} />
            <Route path="/characters/:id" exact element={<CharacterPage />} />
            <Route path="/people/:id" exact element={<PersonPage />} />
            <Route
              path="/profile/:username/reviews"
              exact
              element={<UserReviewsPage />}
            />
            <Route
              path="/anime/:id/reviews"
              exact
              element={<EntryReviewsPage />}
            />
            <Route
              path="/manga/:id/reviews"
              exact
              element={<EntryReviewsPage />}
            />
            <Route
              path="profile/:username/notifications"
              exact
              element={
                <PrivateRoute>
                  <FriendRequestsPage />
                </PrivateRoute>
              }
            />
            <Route path="/notfound" exact element={<NotFound />} />
            <Route path="/error" exact element={<Error />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
