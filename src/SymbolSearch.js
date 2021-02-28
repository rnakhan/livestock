import _ from 'lodash';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

const source = [
  {
    description: 'APPLE INC',
    displaySymbol: 'AAPL',
    symbol: 'AAPL',
    type: 'Common Stock',
  },
  {
    description: 'APPLE INC',
    displaySymbol: 'AAPL.SW',
    symbol: 'AAPL.SW',
    type: 'Common Stock',
  },
  {
    description: 'APPLE INC',
    displaySymbol: 'APC.BE',
    symbol: 'APC.BE',
    type: 'Common Stock',
  },
  {
    description: 'APPLE INC',
    displaySymbol: 'APC.DE',
    symbol: 'APC.DE',
    type: 'Common Stock',
  },
];

const initialState = { isLoading: false, results: [], value: '' };

export default class SymbolSearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.props.setSymbol(result.symbol);
    return this.setState(initialState);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.description);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    );
  }
}
