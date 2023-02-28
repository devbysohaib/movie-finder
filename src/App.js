import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  background: black;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 3px 6px #b7b7b7;
`;
const AppName = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;
const AppIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const SearchBox = styled.div`
  background: white;
  display: flex;
  align-items: center;
  padding: 6px 4px;
  border-radius: 4px;
  width: 40%;
`;
const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const SearchInput = styled.input`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  border: none;
  outline: none;
  max-width: 70%;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 20px;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 50px;
  opacity: 50%;
`;
function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <AppIcon src="/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Enter the movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
