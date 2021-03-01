import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import SymbolSearch from './SymbolSearch';
import StockList from './StockList';

function App() {
  const [symbol, setSymbol] = useState('');
  return (
    <div style={{ marginTop: 10 }}>
      <Grid centered container columns={1}>
        <Grid.Column width={10}>
          <SymbolSearch setSymbol={setSymbol} />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column>
            <StockList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
