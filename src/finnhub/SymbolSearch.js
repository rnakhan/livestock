import _ from 'lodash';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

import { finnhubClient, FINN_HUB_KEY } from './FinnHubClient';

/*
  [{
    description: 'APPLE INC',
    displaySymbol: 'AAPL',
    symbol: 'AAPL',
    type: 'Common Stock',
  },]
  */

const initialState = { isLoading: false, results: [], value: '' };

export default class SymbolSearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.props.setSymbol(result.title);
    return this.setState(initialState);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const query = `https://finnhub.io/api/v1/search?q=${this.state.value}&token=${FINN_HUB_KEY}`;
      console.log(query);
      fetch(query)
        .then((res) => res.json())
        .then(
          (json) => {
            console.log(json.result);
            this.setState({
              isLoading: false,
              results: json.result.map((e) => {
                return { title: e.symbol, description: e.description };
              }),
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoading: false,
              error,
            });
          }
        );
    }, 600);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        input={{
          icon: 'search',
          iconPosition: 'left',
          placeholder: 'Search symbols..',
          fluid: true,
        }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        size="small"
      />
    );
  }
}
