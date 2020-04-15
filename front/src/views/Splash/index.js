import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, TextField, Button, CircularProgress } from '@material-ui/core';
import { alternate, contrastText } from '../../styles/utils'
import { changeName, dismissNameError } from '../../redux/player';
import { usePlayerError } from '../../hooks';

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
  },
  wrapper: {
    position: "relative",
  },
  spinner: {
    position: "absolute",
    right: "16px",
    top: "16px"
  },
  input: {
    position: "relative"
  }
}))

const Splash = () => {
  const [name, setName] = useState("");
  const error = usePlayerError();
  console.log(error)
  const dispatch = useDispatch();
  const css = useStyles()
  const handleChange = (e) => {
    setName(e.target.value)
    dispatch(dismissNameError())
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeName(name.trim()))
  }
  return (
    <Card className={css.card}>
        <h1>Table Party</h1>
        <Container 
          component="form"
          onSubmit={handleSubmit}
          className={css.shyContainer} 
        >
        <div className={css.wrapper}>
          <TextField 
            className={css.input}
            placeholder="Anon42"
            variant="outlined"
            label="Username"
            onChange={handleChange}
            error={error.invalid}
            helperText={error.message}
            disabled={error.loading}
            fullWidth
          />
          {error.loading && <CircularProgress size={24} className={css.spinner}/>}
        </div>
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