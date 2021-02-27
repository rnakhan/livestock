import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import CardExampleCard from './CardExample';

function App() {
  return (
    <Grid>
      <Grid.Column floated="left" width={8}>
        <Container>
          <CardExampleCard />
        </Container>
      </Grid.Column>
      <Grid.Column floated="right" width={8}>
        <Container>
          <CardExampleCard />
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default App;
