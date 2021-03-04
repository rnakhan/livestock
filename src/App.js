import React, { useState, useEffect } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';

import SymbolSearch from './SymbolSearch';
import StockList from './StockList';
import { getQuote } from './finnhub/QueryFinnHub';

const data = [
  {
    symbol: 'AAPL',
    description: 'Apple Inc',
    delta52: '-7.52%',
    h52: '146.25',
    l52: '212.42',
    price: '189.39',
    todayDelta: '1.2%',
    todayH: '180.45',
    todayL: '200.11',
  },
  {
    symbol: 'GOOG',
    description: 'Alphabet Inc',
    delta52: '-2.52%',
    h52: '2246.25',
    l52: '2122.42',
    price: '2189.28',
    todayDelta: '3.2%',
    todayH: '2200.45',
    todayL: '2175.99',
  },
];

function App() {
  const [symbol, setSymbol] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  // in reality, add and remove the symbol and trigger a data refresh
  const [symbolToRemove, setSymbolToRemove] = useState(null);
  const [stockData, setStockData] = useState(data);

  useEffect(() => console.log(stockData), [stockData]);

  const removeSymbol = (symbol) => {
    setSymbolToRemove(symbol);
    setModalOpen(true);
  };

  const finallyDelete = () => {
    setStockData(stockData.filter((e) => e.symbol != symbolToRemove));
    setSymbolToRemove(null);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Grid centered container columns={2}>
        <Grid.Column width={10}>
          <SymbolSearch setSymbol={setSymbol} />
        </Grid.Column>
        <Grid.Column verticalAlign="middle" floated="right" width={4}>
          <Button
            icon="refresh"
            circular
            color="blue"
            size="small"
            onClick={() => getQuote()}
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width={15}>
            <StockList data={stockData} removeSymbol={removeSymbol} />
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

export default App;
