import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, TextField, Button } from '@material-ui/core';
import { alternate, contrastText } from '../../styles/utils'
import { toLobby } from '../../redux/routing'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  shyContainer: {
    marginBottom: "32px",
  },
  button: {
    width: "100%",
    marginTop: "24px",
    backgroundColor: alternate(theme),
    color: contrastText(theme,"alternate"),
    "&:hover": {
      backgroundColor: alternate(theme,"dark")
    }
  }
}))

const Splash = () => {
    const dispatch = useDispatch();
    const css = useStyles()
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(toLobby())
    }
    return (
      <Card className={css.card}>
          <h1>Table Party</h1>
          <Container 
            component="form"
            onSubmit={handleSubmit}
            className={css.shyContainer} 
          >
            <TextField 
              placeholder="Anon42"
              variant="outlined"
              label="Username"
              fullWidth
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              className={css.button}
            >
                Enter
            </Button>
          </Container>
      </Card>
  );
}

export default Splash