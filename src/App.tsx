import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignupPage from "./screens/signupPage/SignupPage";
import AnimeListPage from "./screens/animeListPage/AnimeListPage";
import MangaListPage from "./screens/mangaListPage/MangaListPage";
import CharacterPage from "./screens/characterPage/CharacterPage/CharacterPage";
import AnimePage from "./screens/animepage/AnimePage/AnimePage";
import ProfilePage from "./screens/profile/ProfilePage";
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
import RankedListPage from "./screens/RankedListPage/RankedListPage";
import {
  MediaFormat,
  MediaSort,
  MediaType,
} from "./apis/aniList/aniListTypes";
import {
  animeFormats,
  currentSeason,
  currentSeasonYear,
  mangaFormats,
  nextSeason,
  nextSeasonYear,
} from "./helpers/helpers";
import NotMediaAdvancedSearch from "./screens/AdvancedSearchPage/NotMediaAdvancedSearch/NotMediaAdvancedSearch";
import {
  getFavoriteCharactersQuery,
  getFavoriteStaffQuery,
} from "./apis/aniList/aniList.queries";
import MediaAdvancedSearch from "./screens/AdvancedSearchPage/MediaAdvancedSearch/MediaAdvancedSearch";
import {
  ApiMediaFormatType,
  ApiMediaSortType,
  ApiMediaType,
} from "./apis/aniList/aniListTypes.types";
// import Footer from "./components/Footer/Footer";

function App() {
  const userCacheString: string | null = sessionStorage.getItem("userCache");
  !userCacheString && sessionStorage.setItem("userCache", JSON.stringify({}));

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollUp />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup/*" element={<SignupPage />} />
            <Route
              path="/search"
              element={<Navigate to="/search/anime/*" replace />}
            />
            <Route
              path="/search/anime/*"
              element={
                <MediaAdvancedSearch
                  mediaType={"ANIME"}
                  formats={animeFormats}
                  showSeasonFilter={true}
                />
              }
            />
            <Route
              path="/search/manga/*"
              element={
                <MediaAdvancedSearch
                  mediaType={"MANGA"}
                  formats={mangaFormats}
                  showSeasonFilter={false}
                />
              }
            />
            <Route
              path="/search/character/*"
              element={
                <NotMediaAdvancedSearch
                  type={"character"}
                  heading={"Characters"}
                  query={getFavoriteCharactersQuery}
                />
              }
            />
            <Route
              path="/search/staff/*"
              element={
                <NotMediaAdvancedSearch
                  type={"staff"}
                  heading={"Staff"}
                  query={getFavoriteStaffQuery}
                />
              }
            />
            <Route
              path="search/anime/trending/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.trendingDesc as ApiMediaSortType}
                  heading={"Trending Now"}
                />
              }
            />
            <Route
              path="search/anime/popular/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.popularityDesc as ApiMediaSortType}
                  heading={"All Time Popular"}
                />
              }
            />
            <Route
              path="search/anime/this-season/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.popularityDesc as ApiMediaSortType}
                  season={currentSeason}
                  seasonYear={currentSeasonYear}
                  heading={"Popular This Season"}
                />
              }
            />
            <Route
              path="search/anime/next-season/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.popularityDesc as ApiMediaSortType}
                  season={nextSeason}
                  seasonYear={nextSeasonYear}
                  heading={"Upcoming Next Season"}
                />
              }
            />
            <Route
              path="/search/anime/top/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top Anime"}
                />
              }
            />
            <Route
              path="/search/anime/top-tv/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top TV Shows"}
                  mediaFormat={MediaFormat.tv as ApiMediaFormatType}
                />
              }
            />
            <Route
              path="/search/anime/top-movies/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top Movies"}
                  mediaFormat={MediaFormat.movie as ApiMediaFormatType}
                />
              }
            />
            <Route
              path="/search/anime/top-ovas/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top OVAs"}
                  mediaFormat={MediaFormat.ova as ApiMediaFormatType}
                />
              }
            />
            <Route
              path="/search/anime/top-onas/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top ONAs"}
                  mediaFormat={MediaFormat.ona as ApiMediaFormatType}
                />
              }
            />
            <Route
              path="/search/anime/top-specials/*"
              element={
                <RankedListPage
                  mediaType={MediaType.anime as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top Specials"}
                  mediaFormat={MediaFormat.special as ApiMediaFormatType}
                />
              }
            />
            <Route
              path="/search/manga/top"
              element={
                <RankedListPage
                  mediaType={MediaType.manga as ApiMediaType}
                  mediaSort={MediaSort.scoreDesc as ApiMediaSortType}
                  heading={"Top Manga"}
                />
              }
            />
            <Route
              path="search/manga/trending/*"
              element={
                <RankedListPage
                  mediaType={MediaType.manga as ApiMediaType}
                  mediaSort={MediaSort.trendingDesc as ApiMediaSortType}
                  heading={"Trending Now"}
                />
              }
            />
            <Route
              path="search/manga/popular/*"
              element={
                <RankedListPage
                  mediaType={MediaType.manga as ApiMediaType}
                  mediaSort={MediaSort.popularityDesc as ApiMediaSortType}
                  heading={"All Time Popular"}
                />
              }
            />

            <Route
              path="/search/character/favorite/*"
              element={
                <NotMediaAdvancedSearch
                  type={"character"}
                  heading={"Characters"}
                  query={getFavoriteCharactersQuery}
                />
              }
            />
            <Route path="/profile/:username/*" element={<ProfilePage />} />
            <Route path="/:username/animelist/*" element={<AnimeListPage />} />
            <Route path="/:username/mangalist/*" element={<MangaListPage />} />
            <Route
              path="/:username/editprofile/*"
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/anime/:id/*" element={<AnimePage />} />
            <Route path="/manga/:id/*" element={<MangaPage />} />
            <Route path="/character/:id/*" element={<CharacterPage />} />
            <Route path="/staff/:id/*" element={<StaffPage />} />
            <Route
              path="/profile/:username/reviews/*"
              element={<UserReviewsPage />}
            />
            <Route path="/anime/:id/reviews/*" element={<EntryReviewsPage />} />
            <Route path="/manga/:id/reviews/*" element={<EntryReviewsPage />} />
            <Route
              path="profile/:username/notifications/*"
              element={
                <PrivateRoute>
                  <FriendRequestsPage />
                </PrivateRoute>
              }
            />
            <Route path="/notfound/*" element={<NotFound />} />
            <Route path="/error/*" element={<Error />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </ErrorBoundary>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
