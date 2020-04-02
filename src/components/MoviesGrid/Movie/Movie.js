import React from 'react';
import classes from './Movie.module.css';
import { Link } from 'react-router-dom';
import IMDbLogo from '../../../assets/images/imdb.svg';
import MetaLogo from '../../../assets/images/metacritic.svg';
import TMDbLogo from '../../../assets/images/tmdb.svg';
import RTLogo from '../../../assets/images/rt.png';
import EmptyPoster from '../../../assets/images/empty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

const logos = [IMDbLogo, TMDbLogo, MetaLogo, RTLogo],
  ratingSystemClasses = ['IMDb', 'TMDb', 'Meta', 'RT'];

const Movie = (props) => {
  const { data, ratingSystem } = props;
  let rating, metaColor;
  if (ratingSystem === 0) {
    rating = data.imdb_rating;
  } else if (ratingSystem === 1) {
    rating = data.vote_average;
  } else if (ratingSystem === 2) {
    rating = data.meta_score;
    if (rating >= 60) {
      metaColor = classes.Positive
    } else if (rating >= 40) {
      metaColor = classes.Mixed
    } else if (rating && rating !== 'N/A') {
      metaColor = classes.Negative
    }
  } else {
    rating = data.rt_score;
  }
  return data && (
    <Link 
      className={classes.Movie} 
      to={`/${data.format}/${ratingSystem}/${data.id}`}
    >
      <img
        className={classes.Poster}
        alt={data.title || data.name} 
        src={data.poster_path || EmptyPoster}
      />
      <span className={classes.Rating}>
        <img 
          alt="Rating System Logo" 
          src={logos[ratingSystem]} 
          className={classes[ratingSystemClasses[ratingSystem]]}
        />
        <span className={
          `${classes[ratingSystemClasses[ratingSystem]]} ${metaColor}`
        }>
          { rating || 'N/A' }
        </span>
      </span>
      <span className={classes.Year}>{
        (data.release_date && data.release_date.substr(0, 4))
        || (data.first_air_date && `${data.first_air_date.substr(0, 4)}-${
              data.status === 'Ended'
                ? data.last_air_date.substr(0, 4) : '' 
            }`)
      }</span>
      <div className={classes.Title}>
        {data.title || data.name}
      </div>
      <span className={classes.AddTo}>
        <div data-tooltip="Add to Watchlist" 
          className={classes.Circle}>
          <FontAwesomeIcon icon={faCheckCircle} 
            className={classes.Icon}/>
        </div>
        <div data-tooltip="Add to Watched" 
          className={classes.Circle} >
          <FontAwesomeIcon icon={faEye} 
            className={classes.Icon}/>
        </div>
        <div data-tooltip="Add to Favourites" 
          className={classes.Circle}>
          <FontAwesomeIcon icon={faHeart} 
            className={classes.Icon}/>
        </div>
      </span>
    </Link>
  );
}

export default Movie;