import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MoviesBrowser from './containers/MoviesBrowser/MoviesBrowser';
import Layout from './containers/Layout/Layout';
import MovieDetails from './components/MovieDetails/MovieDetails';

class App extends Component {
  state = {
    totalResults: null,
    searchQuery: ''
  }

  handleTotalResultsChanged = (value) => {
    this.setState({ totalResults: value });
  }
  
  handleSearchFormSubmitted = (event) => {
    event.preventDefault();
    event.target.search.blur();
    window.scrollTo(0, 0);
    this.setState({ searchQuery: event.target.search.value.trim(), withQuery: '' });
  } 
  
  handleSearchQueryReset = () => {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Layout 
            totalResults={this.state.totalResults}
            withQuery={this.state.withQuery}
            searchFormSubmitted={this.handleSearchFormSubmitted}
          >
            <Switch>
              <Route 
                path='/:format/:ratingSystem/:id/' exact 
                component={MovieDetails} 
              />
              <Route 
                path='/'
                render={
                  (props) => <MoviesBrowser
                    {...props}
                    totalResultsChanged={this.handleTotalResultsChanged}
                    searchQuery={this.state.searchQuery}
                    searchQueryReset={this.handleSearchQueryReset}
                    withQueryChanged={this.handleWithQueryChanged}
                  /> 
                } 
              />
                
            </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
