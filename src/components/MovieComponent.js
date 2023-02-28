import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 3px 10px #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 800;
  margin: 10px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const InfoCol = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-weight: 500;
`;
const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
      }}
    >
      <CoverImage src={Poster} />
      <MovieName>{Title}</MovieName>
      <InfoCol>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
      </InfoCol>
    </MovieContainer>
  );
};

export default MovieComponent;
