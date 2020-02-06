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
  handleSearchFormSubmitted = (event, value) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    this.setState({ searchQuery: value.trim() });
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
            searchFormSubmitted={this.handleSearchFormSubmitted}
          >
            <Switch>
              <Route path='/' exact>
                <MoviesBrowser 
                  totalResultsChanged={this.handleTotalResultsChanged}
                  searchQuery={this.state.searchQuery}
                  searchQueryReset={this.handleSearchQueryReset}
                />
              </Route>
              <Route path='/:format/:id' exact component={MovieDetails} />
            </Switch>
            
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
