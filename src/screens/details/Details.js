import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const Details = (props) => {
  const [movie, setMovie] = useState({
    genres: [],
    trailer_url: "",
    artists: [],
  });
  const [starIcons, setStarIcons] = useState([
    {
      id: 1,
      stateId: "star1",
      color: "black",
    },
    {
      id: 2,
      stateId: "star2",
      color: "black",
    },
    {
      id: 3,
      stateId: "star3",
      color: "black",
    },
    {
      id: 4,
      stateId: "star4",
      color: "black",
    },
    {
      id: 5,
      stateId: "star5",
      color: "black",
    },
  ]);

  useEffect(() => {
    let dataMovie = null;
    let xhrMovie = new XMLHttpRequest();
    xhrMovie.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        setMovie(JSON.parse(this.responseText));
      }
    });

    xhrMovie.open("GET", props.baseUrl + "movies/" + props.match.params.id);
    xhrMovie.setRequestHeader("Cache-Control", "no-cache");
    xhrMovie.send(dataMovie);
  }, []);

  const artistClickHandler = (url) => {
    window.location = url;
  };

  const starClickHandler = (id) => {
    let starIconList = [];
    for (let star of starIcons) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow";
      } else {
        starNode.color = "black";
      }
      starIconList.push(starNode);
    }
    setStarIcons(starIconList);
  };

  const opts = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="details">
      <Header
        id={props.match.params.id}
        baseUrl={props.baseUrl}
        showBookShowButton="true"
      />
      <div className="back">
        <Typography>
          <Link to="/"> &#60; Back to Home</Link>
        </Typography>
      </div>
      <div className="flex-containerDetails">
        <div className="leftDetails">
          <img src={movie.poster_url} alt={movie.title} />
        </div>
        <div className="middleDetails">
          <div>
            <Typography variant="headline" component="h2">
              {movie.title}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Genre: </span> {movie.genres.join(", ")}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Duration:</span> {movie.duration}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold">Release Date:</span>{" "}
              {new Date(movie.release_date).toDateString()}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span className="bold"> Rating:</span> {movie.critics_rating}{" "}
            </Typography>
          </div>
          <div className="marginTop16">
            <Typography>
              <span className="bold">Plot:</span>{" "}
              <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}{" "}
            </Typography>
          </div>
          <div className="trailerContainer">
            <Typography>
              <span className="bold">Trailer:</span>
            </Typography>
            <YouTube
              videoId={movie.trailer_url.split("?v=")[1]}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        </div>
        <div className="rightDetails">
          <Typography>
            {" "}
            <span className="bold">Rate this movie: </span>
          </Typography>
          {starIcons.map((star) => (
            <StarBorderIcon
              className={star.color}
              key={"star" + star.id}
              onClick={() => starClickHandler(star.id)}
            />
          ))}
          <div className="bold marginBottom16 marginTop16">
            <Typography>
              <span className="bold">Artists:</span>
            </Typography>
          </div>
          <GridList cellHeight={160} cols={2}>
            {movie.artists.map((artist) => (
              <GridListTile
                className="gridTile"
                onClick={() => artistClickHandler(artist.wiki_url)}
                key={artist.id}
              >
                <img
                  src={artist.profile_url}
                  alt={artist.first_name + " " + artist.last_name}
                />
                <GridListTileBar
                  title={artist.first_name + " " + artist.last_name}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
};

export default Details;
