import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';

import SymbolSearch from './SymbolSearch';
import StockList from './StockList';

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
            color="teal"
            size="small"
            onClick={() => console.log('refersh clicked')}
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column width={15}>
            <StockList data={data} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
