import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, Input, Button } from '@material-ui/core';
import { primary, alternate, contrastText } from './styles/utils'
import { RoomList } from './components';
import { range } from 'ramda';

const centeredColumn = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  textAlign: "center"
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: primary(theme),
    paddingTop: "16px",
    paddingBottom: "16px",
    height: "100vh",
    ...centeredColumn
  },
  card: {
    padding: "16px",
    height: "80vh",
    ...centeredColumn,
    justifyContent: "flex-start"
  },
  shyContainer: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  button: {
    backgroundColor: alternate(theme),
    color: contrastText(theme,"alternate"),
    "&:hover": {
      backgroundColor: alternate(theme,"dark")
    }
  }
}))

const testRooms = range(0,6).map(
  val => ({
    name: `test`,
    playerCount: val*2,
    capacity: 12,
  })
)

function App() {
  const css = useStyles()
  return (
    <Container className={css.container}>
      <Card className={css.card}>
        <h1>Table Party</h1>
        <Input placeholder="Username"/>
        <Container className={css.shyContainer}>
          <Button variant="contained" className={css.button}>
            Create Room
          </Button>
        </Container>
        <RoomList rooms={testRooms}/>
      </Card>
    </Container>
  );
}

export default App;
