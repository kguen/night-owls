import React, { Component } from 'react';
import classes from './MoviesBrowser.module.css';
import axios from 'axios';
import queryString from 'query-string';
import Sidebar from '../../components/Sidebar/Sidebar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import NavigationTabs from '../../components/NavigationTabs/NavigationTabs';

const DEFAULT_FROM_YEAR = 1900,
  DEFAULT_TO_YEAR = (new Date()).getFullYear();

const formatList = [
  { value: 'movie', label: 'Movie' },
  { value: 'tv', label: 'TV / Series' }
], ratingSystemList = [
  { value: 0, label: 'IMDb (default)'},
  { value: 1, label: 'TMDb' },
  { value: 2, label: 'Metacritic' },
  { value: 3, label: 'RT (critics)' }
], decadeList = [
  { value: [DEFAULT_FROM_YEAR, DEFAULT_TO_YEAR], label: 'All decades' }, 
  { value: [2010, 2019], label: '2010s'},
  { value: [2000, 2009], label: '2000s'}, 
  { value: [1990, 1999], label: '1990s'}, 
  { value: [1980, 1989], label: '1980s'}, 
  { value: [1970, 1979], label: '1970s'}, 
  { value: [1960, 1969], label: '1960s'}, 
  { value: [1950, 1959], label: '1950s'}, 
  { value: [1940, 1949], label: '1940s'}, 
  { value: [1930, 1939], label: '1930s'}, 
  { value: [1920, 1929], label: '1920s'},
  { value: [1910, 1919], label: '1910s'}, 
  { value: [1900, 1909], label: '1900s'} 
], navigationTabList = {
  movie: [
    { value: 'popular', label: 'Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'top_rated', label: 'Rating' },
    { value: 'upcoming', label: 'Upcoming' }
  ],
  tv: [
    { value: 'popular', label: 'Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'top_rated', label: 'Rating' },
    { value: 'on_the_air', label: 'On Air' }
  ]
}

const getGenres = async (format) => {
  const response = await axios.get('/api/genres', {
    params: { format }
  });
  return response.data;
}

const getFullData = async (format, genres, rating, fromYear, toYear, page, withQuery, searchQuery, tab) => {
  const response = await axios.get('/api/movies', {
    params: { format, genres, rating, fromYear, toYear, page, withQuery, searchQuery, tab }
  });
  return response.data;
}

const getSearchDesc = async (query) => {
  const queryObj = queryString.parse(query);
  const data = await Promise.all(
    Object.keys(queryObj).map(async key => {
      const id = queryObj[key];
      const format = key === 'with_people' ? 'person' : 'keyword';
      const response = await axios.get('/api/others', { 
        params: { format, id } 
      });
      return response.data && response.data.name;
    })
  );
  return data;
}

class MoviesBrowser extends Component {
  state = {
    fetchedData: [],
    fetchedGenres: [],
    searchDesc: [],
    pageCount: 1,
    hasData: true,
    ratingSystem: ratingSystemList[0].value,
    activeTab: 0,
    filter: {
      format: formatList[0].value,
      genres: [],
      minRating: 1.0,
      fromYear: DEFAULT_FROM_YEAR,
      toYear: DEFAULT_TO_YEAR
    }
  }

  handlePageCountIncreased = () => {
    this.setState(prevState => {
      return { pageCount: prevState.pageCount + 1 }
    })
  }

  handleRatingSystemChanged = (value) => {
    this.setState({ ratingSystem: value });
  }

  handleFormatFilterChanged = (_, value) => {
    this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter, 
          format: value
        },
        pageCount: 1,
        activeTab: 
          navigationTabList[prevState.filter.format][prevState.activeTab].value === 'trending'
            ? 0 : prevState.activeTab
      };
    });
  }

  handleGenreFilterChanged = (event, value) => {
    const checked = event.target.checked,
      genres = [...this.state.filter.genres];
    if (checked) {
      genres.push(value);
    } else {
      const index = genres.indexOf(value);
      if (index !== -1) genres.splice(index, 1);
    }
    this.props.searchQueryReset();
    this.setState(prevState => {
      return {
        filter: {...prevState.filter, genres},
        pageCount: 1,
        activeTab: 
          navigationTabList[prevState.filter.format][prevState.activeTab].value === 'trending'
            ? 0 : prevState.activeTab
      }
    });
  }

  handleMinRatingFilterChanged = (value) => {
    this.props.searchQueryReset();
    this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter,
          minRating: value
        },
        pageCount: 1,
        activeTab: 
          navigationTabList[prevState.filter.format][prevState.activeTab].value === 'trending'
            ? 0 : prevState.activeTab
      }
    });
  }

  handleYearSliderFilterChanged = (fromYear, toYear) => {
    this.props.searchQueryReset();
    this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter,
          fromYear, toYear
        },
        pageCount: 1,
        activeTab: 
          navigationTabList[prevState.filter.format][prevState.activeTab].value === 'trending'
            ? 0 : prevState.activeTab
      }
    });
  }

  handleDecadeDropdownFilterChanged = (values) => {
    this.props.searchQueryReset();
    this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter,
          fromYear: values[0], 
          toYear: values[1]
        },
        pageCount: 1,
        activeTab: 
          navigationTabList[prevState.filter.format][prevState.activeTab].value === 'trending'
            ? 0 : prevState.activeTab
      }
    });
  }

  handleActiveTabValueChanged = (value) => {
    this.props.searchQueryReset();
    this.setState({ activeTab: value, pageCount: 1 });
  }

  async componentDidMount() {
    window.scroll({ top: 0, behavior: 'smooth' });
    await this.props.searchQueryReset();
    const format = this.state.filter.format, 
      genres = this.state.filter.genres,
      rating = this.state.filter.minRating,
      fromYear = this.state.filter.fromYear,
      toYear = this.state.filter.toYear,
      page = this.state.pageCount,
      searchQuery = this.props.searchQuery,
      withQuery = this.props.location.search.slice(1),
      tab = navigationTabList[this.state.filter.format][this.state.activeTab].value;
    const fetchedData = await getFullData(format, genres, rating, fromYear, toYear, page, withQuery, searchQuery, tab);
    const fetchedGenres = await getGenres(format);
    const searchDesc = await getSearchDesc(this.props.location.search);
    this.props.totalResultsChanged(fetchedData.total_results);
    this.setState({
      fetchedData: fetchedData.data,
      hasData: !!fetchedData.data.length,
      fetchedGenres,
      searchDesc
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.filter.format !== this.state.filter.format
      || (prevState.filter.genres.length !== this.state.filter.genres.length 
          && prevState.fetchedGenres === this.state.fetchedGenres)
      || prevState.filter.minRating !== this.state.filter.minRating
      || prevState.filter.fromYear !== this.state.filter.fromYear
      || prevState.filter.toYear !== this.state.filter.toYear
      || (prevState.pageCount !== this.state.pageCount && this.state.pageCount > 1)
      || prevProps.searchQuery !== this.props.searchQuery
      || prevState.activeTab !== this.state.activeTab
    ) {
      if (prevProps.searchQuery !== this.props.searchQuery && this.props.searchQuery !== '') {
        await this.setState({ pageCount: 1 });  
      }
      if (this.state.pageCount === 1) {
        window.scroll({ top: 0, behavior: 'smooth' });
      }
      if (prevState.filter.format !== this.state.filter.format) {
        const fetchedGenres = await getGenres(this.state.filter.format);
        await this.setState(prevState => {
          return {
            fetchedGenres, 
            filter: {
              ...prevState.filter,
              genres: []
            }
          } 
        });
      }
      const format = this.state.filter.format, 
        genres = this.state.filter.genres,
        rating = this.state.filter.minRating, 
        fromYear = this.state.filter.fromYear,
        toYear = this.state.filter.toYear,
        page = this.state.pageCount,
        searchQuery = this.props.searchQuery,
        withQuery = this.props.location.search.slice(1),
        tab = navigationTabList[this.state.filter.format][this.state.activeTab].value;
      const fetchedData = await getFullData(format, genres, rating, fromYear, toYear, page, withQuery, searchQuery, tab);
      if (this.state.pageCount === 1) {
        this.props.totalResultsChanged(fetchedData.total_results);
        this.setState({ 
          hasData: !!fetchedData.data.length,
          fetchedData: fetchedData.data 
        });
      } else {
        this.setState(prevState => {
          return {
            hasData: !!fetchedData.data.length,
            fetchedData: prevState.fetchedData.concat(fetchedData.data) 
          }
        });
      }
    }
  }

  render() {
    const genreList = this.state.fetchedGenres.map(item => {
      return { label: item.name, value: item.id }
    });
    return (
      <div className={classes.MoviesBrowser}>
        <Sidebar
          formatList={formatList}
          formatFilterChanged={this.handleFormatFilterChanged}
          genreList={genreList}
          genreFilterChanged={this.handleGenreFilterChanged}
          ratingSystemList={ratingSystemList}
          ratingSystemDropdownChanged={this.handleRatingSystemChanged}
          minRating={this.state.filter.minRating} 
          minRatingSliderChanged={this.handleMinRatingFilterChanged}
          fromYear={this.state.filter.fromYear}
          toYear={this.state.filter.toYear}
          yearSliderChanged={this.handleYearSliderFilterChanged}
          decadeList={decadeList}
          decadeDropdownChanged={this.handleDecadeDropdownFilterChanged}
        />
        <div className={classes.Content}>
          <NavigationTabs 
            list={navigationTabList[this.state.filter.format]}
            activeTab={this.state.activeTab}
            activeTabChanged={this.handleActiveTabValueChanged}
          />
          { (this.state.searchDesc.length
              && this.state.filter.format === 'movie'
              && navigationTabList['movie'][this.state.activeTab].value !== 'trending'
              && this.props.searchQuery === '')
            ? <span className={classes.SearchDesc}>
                Search results for: '{this.state.searchDesc.join(', ')}'
              </span> 
            : null }
          <MoviesGrid
            hasData={this.state.hasData}
            data={this.state.fetchedData}
            ratingSystem={this.state.ratingSystem}
            infiniteScroll={this.handlePageCountIncreased}
          />
        </div>
      </div>
    )
  }
}

export default MoviesBrowser;