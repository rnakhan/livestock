import React, { useState, useReducer } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';

import SymbolSearch from './finnhub/SymbolSearch';
import StockList from './StockList';
import { getQuote } from './finnhub/QueryFinnHub';
import { delay } from './common/Utils';

function AppScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [symbolToRemove, setSymbolToRemove] = useState(null);

  const initialData = [
    {
      symbol: 'AAPL',
      description: 'Apple Inc',
      delta52: '-7.52%',
      h52: '212.25',
      hdt52: '2021-01-25',
      l52: '142.42',
      ldt52: '2020-03-31',
      price: '189.39',
      todayDelta: '1.2%',
      todayH: '180.45',
      todayL: '200.11',
      pc: '193',
    },
    {
      symbol: 'GOOG',
      description: 'Alphabet Inc',
      delta52: '-2.52%',
      h52: '2246.25',
      hdt52: '2021-01-25',
      l52: '2122.42',
      ldt52: '2020-03-31',
      price: '2189.28',
      todayDelta: '3.2%',
      todayH: '2200.45',
      todayL: '2175.99',
      pc: '2007',
    },
  ];

  const stockDataReducer = (state, action) => {
    switch (action.type) {
      case 'FINALLY_DELETE':
        return state.filter((e) => e.symbol !== symbolToRemove);
      case 'UPDATE_QUOTE':
        return state.map((stock) => {
          if (stock.symbol === action.updatedQuote.symbol) {
            return { ...stock, ...action.updatedQuote };
          } else {
            return stock;
          }
        });
      case 'ADD_SYMBOL':
        return [...state, action.newSymbol];
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(stockDataReducer, initialData);

  //{ title, description }
  const addSymbol = async (res) => {
    dispatch({
      type: 'ADD_SYMBOL',
      newSymbol: { symbol: res.title, description: res.description },
    });
  };

  const removeSymbol = (symbol) => {
    setSymbolToRemove(symbol);
    setModalOpen(true);
  };

  const finallyDelete = () => {
    dispatch({ type: 'FINALLY_DELETE' });
  };

  const refreshQuotes = async () => {
    const symbols = data.map((e) => e.symbol);
    for (let i = 0; i < symbols.length; i++) {
      getQuote(symbols[i], (quote) => {
        dispatch({
          type: 'UPDATE_QUOTE',
          updatedQuote: quote,
        });
      });
      await delay(1000);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Grid centered container columns={2}>
        <Grid.Column width={10}>
          <SymbolSearch addSymbol={addSymbol} />
        </Grid.Column>
        <Grid.Column verticalAlign="middle" floated="right" width={4}>
          <Button
            icon="refresh"
            circular
            color="blue"
            size="small"
            onClick={() => refreshQuotes()}
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width={15}>
            <StockList data={data} removeSymbol={removeSymbol} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal closeOnEscape={true} closeOnDimmerClick={true} open={modalOpen}>
        <Modal.Header>Stop tracking this?</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to stop tracking {symbolToRemove}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)} negative>
            No
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
              finallyDelete();
            }}
            positive
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default AppScreen;
