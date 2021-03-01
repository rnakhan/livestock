import React from 'react';
import { List, Label, Grid, GridColumn } from 'semantic-ui-react';

const StockList = () => (
  <List divided relaxed verticalAlign="middle">
    <List.Item>
      <Grid verticalAlign="middle" textAlign="center" columns={4}>
        <Grid.Column>Symbol</Grid.Column>
        <Grid.Column>52W</Grid.Column>
        <Grid.Column>Price</Grid.Column>
        <Grid.Column>Today</Grid.Column>
      </Grid>
    </List.Item>

    <List.Item>
      <Grid verticalAlign="middle" textAlign="center" columns={4}>
        <Grid.Column width={4}>
          AAPL <br />
          <span style={{ fontSize: 8 }}>Alphabet Inc.</span>
        </Grid.Column>
        <Grid.Column width={4}>
          <Label basic color="red" size="tiny" horizontal>
            -7.5%
          </Label>
          <br />
          <span style={{ fontSize: 8 }}>146.25 - 212.42</span>
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          189.28
        </Grid.Column>
        <Grid.Column width={4}>
          <Label color="green" horizontal size="small">
            1.2%
          </Label>
          <br />
          <span style={{ fontSize: 8 }}>180.45 - 200.11</span>
        </Grid.Column>
      </Grid>
    </List.Item>

    <List.Item>
      <Grid verticalAlign="middle" textAlign="center" columns={4}>
        <Grid.Column width={4}>
          GOOG <br />
          <span style={{ fontSize: 8 }}>Alphabet Inc.</span>
        </Grid.Column>
        <Grid.Column width={4}>
          <Label basic color="red" size="tiny" horizontal>
            -3.5%
          </Label>
          <br />
          <span style={{ fontSize: 8 }}>2200.21 - 1500.34</span>
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          2100.75
        </Grid.Column>
        <Grid.Column width={4}>
          <Label color="green" horizontal size="small">
            2.2%
          </Label>
          <br />
          <span style={{ fontSize: 8 }}>2107.33 - 2059.86</span>
        </Grid.Column>
      </Grid>
    </List.Item>
  </List>
);

export default StockList;
