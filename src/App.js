// import logo from './logo.svg';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'

import './App.css';

import Home from './components/Home/Home';
import MultiplyBet from './components/MultiplyBet/MultiplyBet';
import Login from './components/Login/Login';
import RollHistory from './components/RollHistory/RollHistory';
import Lottery from './components/Lottery/Lottery';
import FakeDoor from './components/FakeDoor/FakeDoor';
import PathError from './components/PathError/PathError';
import VerifyRoll from './components/VerifyRoll/VerifyRoll';
import GiftBox from './components/GiftBox/GiftBox';

// const wallet = '0.00';

const App = () => {
  // const [wallet, setWallet] = useState(0.00)
  // console.log("wallet", wallet)

  return(
    <ToastProvider>
      <Switch>
        {/* <Route path='/' component={() => <Home wallet={wallet} setWallet={wallet => setWallet(wallet)}/>} exact /> */}
        <Route path='/' component={Home} exact/>
        <Route path='/multiplybet' component={MultiplyBet} />
        <Route path='/rollHistory' component={RollHistory} />
        <Route path='/login' component={Login} />
        <Route path='/lottery' component={Lottery} />
        <Route path='/fakedoor' component={FakeDoor} />
        <Route path='/giftbox' component={GiftBox} />
        <Route path={`/VerifyRoll/:serverSeed/:clientSeed/:rollValue`} component={VerifyRoll} />
        <Route component={PathError} />
      </Switch>
    </ToastProvider>
  )
}


export default App;

// Previous build
// function App() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }