import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classes from './MoviesGrid.module.css';
import Movie from './Movie/Movie';
import Loader from './Loader/Loader';
import EndMessage from './EndMessage/EndMessage';

const MoviesGrid = (props) => {
  return (
    <InfiniteScroll
      className={classes.MoviesGrid}
      dataLength={props.data.length}
      hasMore={props.hasData}
      next={props.infiniteScroll}
      loader={<Loader />}
      endMessage={<EndMessage />}
      scrollThreshold={1.0}
    >
      {props.data.length ? props.data.map(item => 
        <div 
          className={classes.Wrapper} 
          key={item.id}
        >
          <Movie
            data={item}
            ratingSystem={props.ratingSystem}
          />
        </div>
      ) : null}
    </InfiniteScroll>
  );
}

export default MoviesGrid;