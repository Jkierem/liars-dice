import React from 'react';
import { useRouting } from './hooks'
import { cond, equals } from 'ramda';
import Splash from './views/Splash';
import CreateRoom from './views/CreateRoom';
import Lobby from './views/Lobby';
import { Base } from './components';

function App() {
  const view = useRouting()
  return <Base>
    {cond([
      [equals("splash"), () => <Splash />],
      [equals("lobby"), () => <Lobby />],
      [equals("create"), () => <CreateRoom />]
    ])(view)}
  </Base>
    
}

export default App;
