import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { API_KEY } from "../App";
const Container = styled.div`
  display: flex;
  padding: 20px 30px;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 800;
  margin: 15px 0;
  text-transform: capitalize;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const MovieInfo = styled.span`
  font-weight: 500;
  margin: 5px 0;
  text-transform: capitalize;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  background: lightgray;
  height: fit-content;
  border: none;
  font-weight: 600;
  font-size: 16px;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
`;
const MovieInfoComponent = (props) => {
  const { selectedMovie, onMovieSelect } = props;
  const [movieInfo, setMovieInfo] = useState();
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        setMovieInfo(response.data);
      });
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoCol>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoCol>
          <Close onClick={() => onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading"
      )}
    </Container>
  );
};

export default MovieInfoComponent;
