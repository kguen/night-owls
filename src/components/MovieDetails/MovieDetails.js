import React, { Component } from 'react';
import classes from './MovieDetails.module.css';
import axios from 'axios';
import IMDbLogo from '../../assets/images/imdb.svg';
import MetaLogo from '../../assets/images/metacritic.svg';
import TMDbLogo from '../../assets/images/tmdb.svg';
import RTLogo from '../../assets/images/rt.png';
import InfoCards from './InfoCards/InfoCards';
import Loader from '../MoviesGrid/Loader/Loader';
import Movie from '../MoviesGrid/Movie/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

const logos = [IMDbLogo, TMDbLogo, MetaLogo, RTLogo],
  ratingSystemClasses = ['IMDb', 'TMDb', 'Meta', 'RT'];

const getDetails = async (format, id) => {
  const { data } = await axios.get('/api/details', {
    params: { format, id }
  });
  const itemTitle = (data.title || data.name);
  const itemYear = format === 'movie' 
    ? (data.release_date && data.release_date.substr(0, 4))
    : (data.first_air_date && data.first_air_date.substr(0, 4));
  return { ...data, itemTitle, itemYear};
}

class MovieDetails extends Component {
  state = {
    data: null,
    showDetails: false,
    loading: true
  }

  async componentDidMount() {
    window.scroll({ top: 0, behavior: 'smooth' });
    const { params } = this.props.match;
    const data = await getDetails(params.format, params.id);
    document.title = `${data.itemTitle} (${data.itemYear}) - Movie Hub`;
    this.setState({ data, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match !== this.props.match) {
      const { params } = this.props.match;
      await this.setState({ loading: true });
      const data = await getDetails(params.format, params.id);
      document.title = `${data.itemTitle} (${data.itemYear}) - Movie Hub`;
      this.setState({ data, loading: false, showDetails: false });
    }
  }

  toggleDetails = () => {
    this.setState(prevState => {
      return { showDetails: !prevState.showDetails }
    })
  }
  
  render() {
    const { params } = this.props.match, { data } = this.state;
    const ratingSystem = params.ratingSystem;
    let rating, voteCount, metaColor;
    if (!this.state.loading) {
      if (ratingSystem === '0') {
        rating = data.imdb_rating;
        voteCount = data.imdb_votes;
      } else if (ratingSystem === '1') {
        rating = data.vote_average;
        voteCount = data.vote_count;
      } else if (ratingSystem === '2') {
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
    }
    return this.state.loading 
    ? <div className={classes.Loader}>
        <Loader />
      </div>
    : ( 
      <div className={classes.Container}>
        <h1 className={classes.Title}>
          <span>{data.itemTitle}</span>
          <span className={classes.Year}>{
            params.format === 'movie' 
              ? data.itemYear
              : `${data.itemYear}-${
                data.status === 'Ended'
                  ? data.last_air_date.substr(0, 4) : '' 
              }`
          }</span>
        </h1>
        <div className={classes.Rating}>
          <img 
            alt="Rating System Logo" 
            src={logos[ratingSystem]} 
            className={classes[ratingSystemClasses[ratingSystem]]}
          />
          <span className={`${metaColor}`}>
            { rating || 'N/A' }
          </span>
          { voteCount && <span className={classes.VoteCount}>{`(${voteCount || 'N/A'})`}</span> }
        </div>
        <p className={classes.Overview}>
          {data.overview}&nbsp;
          <span 
            className={classes.MoreDetails}
            onClick={this.toggleDetails}
          >
            { this.state.showDetails ? 'Less' : 'More' } details
          </span>.
        </p>
        { this.state.showDetails ? <>
          {
            params.format === 'movie'
            ? <>
              <InfoCards title="Directors" list={data.directors}/>
              <InfoCards title="Writers" list={data.writers}/>
            </>
            : <InfoCards title="Producers" list={data.producers}/>  
          } 
          <InfoCards title="Casts" list={data.casts}/>
          <InfoCards title="Keywords" list={data.keywords} link="with_keywords"/>
        </> : null }
        
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
            href={`https://google.com/search?q=${data.itemTitle.split(' ').join('+')} ${data.itemYear}`} 
            className={classes.Google}
          >Google</a>
          <a href={`https://themoviedb.org/${params.format}/${data.id}`} className={classes.TMDb}>TMDB</a>
          <a href={`https://imdb.com/title/${data.imdb_id}`} className={classes.IMDb}>IMDB</a>
          { data.facebook_id && 
            <a href={`https://fb.com/${data.facebook_id}`} className={classes.Facebook}>Facebook</a> }
          { data.twitter_id && 
            <a href={`https://twitter.com/${data.twitter_id}`} className={classes.Twitter}>Twitter</a> }
        </span>
        { data.video && <iframe
          src={`https://www.youtube.com/embed/${data.video.key}`} 
          frameBorder="0" 
          allowFullScreen
          title={data.itemTitle}
        >
        </iframe> }
        <h1 className={classes.Similar}>Similar titles</h1>
        <span className={classes.SimilarDesc}>
          Below are recommendations that you might like based on this title.
        </span>
        <div className={classes.Carousel}>
        { data.recommendations.length 
          ? data.recommendations.map(item =>
            <div 
              className={classes.ItemContainer}
              key={item.id}
            >
              <Movie
                data={item}
                ratingSystem={+ratingSystem}
              />
            </div>
          ) 
          : null }
        </div>
      </div>
    );
  }
}

export default MovieDetails;
