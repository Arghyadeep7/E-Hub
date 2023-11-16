import { Routes, Route, Navigate } from "react-router-dom";

import Footer from "./common/Footer";
import Component from "./common/Component";

import TvSeries from "./tvSeries/TvSeries";
import TvSeriesDetail from "./tvSeries/TvSeriesDetail";
import SearchQuery from "./common/SearchQuery";
import SeasonComponent from "./tvSeries/SeasonComponent";
import EpisodeComponent from "./tvSeries/EpisodeComponent";

import Movies from "./movies/Movies";
import MovieDetail from "./movies/MovieDetail";

import Container from "react-bootstrap/Container";

function App() {

  return (
    <Container >
      
      <Routes>
        
        <Route path="/home" element={
          <>
            <Movies />
            <TvSeries path="home"/>
          </>
        } />

        <Route path="/web_series" element={<TvSeries />} />
        <Route path="/web_series/popular" element={<Component type="web_series" filter="popular"/>} />
        <Route path="/web_series/top_rated" element={<Component type="web_series" filter="top_rated"/>} />
        <Route path="/web_series/trending" element={<Component type="web_series" filter="trending"/>} />
        <Route path="/web_series/:id" element={<TvSeriesDetail />} />
        <Route path="/web_series/:id/season/:season_num" element={<SeasonComponent />} />
        <Route path="/web_series/:id/season/:season_num/episode/:episode_num" element={<EpisodeComponent />} />
        
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/now_playing" element={<Component type="movies" filter="now_playing"/>} />
        <Route path="/movies/upcoming" element={<Component type="movies" filter="upcoming"/>} />
        <Route path="/movies/popular" element={<Component type="movies" filter="popular"/>} />
        <Route path="/movies/top_rated" element={<Component type="movies" filter="top_rated"/>} />
        <Route path="/movies/trending" element={<Component type="movies" filter="trending"/>} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        
        <Route path="/search/:query" element={<SearchQuery />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
