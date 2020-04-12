import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, Button, Icon } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons'
import { alternate, contrastText } from '../../styles/utils'
import { RoomList } from '../../components';
import { toSplash, toCreateRoom } from '../../redux/routing'
import { useRooms } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "16px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "flex-start"
  },
  shyContainer: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: alternate(theme),
    color: contrastText(theme,"alternate"),
    "&:hover": {
      backgroundColor: alternate(theme,"dark")
    }
  }
}))

const Lobby = () => {
    const dispatch = useDispatch();
    const rooms = useRooms();
    const css = useStyles()
    const handleClick = () => dispatch(toCreateRoom())
    const handleBack = () => dispatch(toSplash())
    return (
      <Card className={css.card}>
        <Icon onClick={handleBack}>
          <ArrowBack />
        </Icon>
        <h1>Rooms</h1>
        <Container className={css.shyContainer}>
          <Button
            variant="contained" 
            className={css.button}
            onClick={handleClick}
          >
              Create Room
          </Button>
        </Container>
        <RoomList rooms={rooms}/>
      </Card>
);
}

export default Lobby;