import React, { Component } from 'react';
import classes from './MovieDetails.module.css';
import axios from 'axios';
import IMDbLogo from '../../assets/images/imdb.svg';
import InfoCards from './InfoCards/InfoCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

const getDetails = async (format, id) => {
  const response = await axios.get('/api/details', {
    params: { format, id }
  });
  return response.data;
}

class MovieDetails extends Component {
  state = {
    data: null
  }
  async componentDidMount() {
    const { params } = this.props.match;
    const data = await getDetails(params.format, params.id);
    this.setState({ data });
  }
  render() {
    const { params } = this.props.match, { data } = this.state;
    const itemTitle = data && (data.title || data.name);
    return data && (
      <div className={classes.Container}>
        <h1>
          <span>{itemTitle}</span>
          <span className={classes.Year}>{
            params.format === 'movie' 
              ? (data.release_date && data.release_date.substr(0, 4))
              : (data.first_air_date && `${data.first_air_date.substr(0, 4)}-${
                data.status === 'Ended'
                  ? data.last_air_date.substr(0, 4) : '' 
              }`)
          }</span>
        </h1>
        <div className={classes.Rating}>
          <img 
            className={classes.IMDbLogo} 
            src={IMDbLogo}
            alt="Rating System Logo"
          />
          <span>{data.imdb_rating}</span>
          <span className={classes.VoteCount}>{`(${data.imdb_votes})`}</span>
        </div>
        <div className={classes.Overview}>
          <p>{data.overview}</p>
        </div>
        { params.format === 'movie'
          ? <>
            <InfoCards title="Directors" list={data.directors} keyProp="credit_id"/>
            <InfoCards title="Writers" list={data.writers} keyProp="credit_id"/>
          </>
          : <InfoCards title="Producers" list={data.producers} keyProp="credit_id"/>  
        } 
        <InfoCards title="Casts" list={data.casts} keyProp="credit_id"/>
        <InfoCards title="Keywords" list={data.keywords} />
        <span className={classes.AddTo}>
          <div data-tooltip="Add to Watchlist">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div data-tooltip="Add to Watched">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div data-tooltip="Add to Favourites">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </span>
        <span className={classes.Links}>
          <a 
            href={`https://google.com/search?q=${itemTitle.split(' ').join('+')} ${ 
              params.format === 'movie' 
              ? (data.release_date && data.release_date.substr(0, 4))
              : (data.first_air_date && data.first_air_date.substr(0, 4))} ${params.format}`} 
            className={classes.Google}
          >Google</a>
          <a href={`https://fb.com/${data.facebook_id}`} className={classes.Facebook}>Facebook</a>
          <a href={`https://twitter.com/${data.twitter_id}`} className={classes.Twitter}>Twitter</a>
        </span>
        { data.video && <iframe
          src={`https://www.youtube.com/embed/${data.video.key}`} 
          frameBorder="0" 
          allowFullScreen
          title={itemTitle}
        >
        </iframe> }
      </div>
    );
  }
}

export default MovieDetails;
