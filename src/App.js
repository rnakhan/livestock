import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

import SymbolSearch from './SymbolSearch';

function App() {
  const [symbol, setSymbol] = useState('');
  return (
    <Container>
      <SymbolSearch setSymbol={setSymbol} />
      <div>{symbol}</div>
    </Container>
  );
}

export default App;
