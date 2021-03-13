import React, { useState, useReducer, useEffect } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import SymbolSearch from './finnhub/SymbolSearch';
import StockList from './StockList';
import { getQuote } from './finnhub/QueryFinnHub';
import { delay } from './common/Utils';
import { useAuth } from './hooks/UseAuth';
import { firestore } from './common/firebase';

function AppScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [symbolToRemove, setSymbolToRemove] = useState(null);

  const auth = useAuth();

  const history = useHistory();

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
        firestore
          .collection('userData')
          .doc(auth.getUser().uid)
          .collection('symbols')
          .doc(action.newSymbol.symbol)
          .set({
            description: action.newSymbol.description,
          });
        return [...state, action.newSymbol];
      case 'ADD_ALL':
        return action.initState;
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(stockDataReducer, []);

  useEffect(() => {
    const initState = [];
    firestore
      .collection('userData')
      .doc(auth.getUser().uid)
      .collection('symbols')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          initState.push({
            symbol: doc.id,
            description: doc.data().description,
          });
        });
      })
      .finally(() => {
        dispatch({
          type: 'ADD_ALL',
          initState: initState,
        });
      });
  }, []);

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

  const signOut = () => {
    auth.signout(() => {
      history.replace('/login');
    });
  };

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <Grid centered container columns={3}>
          <Grid.Column width={8}>
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
          <Grid.Column verticalAlign="middle" floated="right" width={4}>
            <Button basic color="red" size="small" onClick={signOut}>
              Signout
            </Button>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={15}>
              <StockList
                data={data}
                removeSymbol={removeSymbol}
                refreshQuotes={refreshQuotes}
              />
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
    </>
  );
}

export default AppScreen;
