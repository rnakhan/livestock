import React from 'react';
import { List, Label, Grid } from 'semantic-ui-react';

import longPressEvents from './common/LongPressEvents';

const formatListItems = (data, removeSymbol) => {
  return data.map((e, i) => {
    return (
      <List.Item key={i}>
        <div {...longPressEvents((i) => removeSymbol(e.symbol), 300)}>
          <Grid verticalAlign="middle" textAlign="center" columns={4}>
            <Grid.Column width={4}>
              {e.symbol} <br />
              <span style={{ fontSize: 8 }}>{e.description}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Label basic color="red" size="tiny" horizontal>
                {e.delta52}
              </Label>
              <br />
              <span style={{ fontSize: 8 }}>
                {e.h52} - {e.l52}
              </span>
            </Grid.Column>
            <Grid.Column width={4} textAlign="center">
              {e.price}
            </Grid.Column>
            <Grid.Column width={4}>
              <Label color="green" horizontal size="small">
                {e.todayDelta}
              </Label>
              <br />
              <span style={{ fontSize: 8 }}>
                {e.todayH} - {e.todayL}
              </span>
            </Grid.Column>
          </Grid>
        </div>
      </List.Item>
    );
  });
};
const StockList = (props) => {
  return (
    <List divided relaxed verticalAlign="middle">
      <List.Item>
        <Grid verticalAlign="middle" textAlign="center" columns={4}>
          <Grid.Column>Symbol</Grid.Column>
          <Grid.Column>52W</Grid.Column>
          <Grid.Column>Price</Grid.Column>
          <Grid.Column>Today</Grid.Column>
        </Grid>
      </List.Item>

      {formatListItems(props.data, props.removeSymbol)}
    </List>
  );
};

export default StockList;
