// import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/Home/Home';
import MultiplyBet from './components/MultiplyBet/MultiplyBet';

const App = () => {
  return(
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/multiplybet' component={MultiplyBet} />
    </Switch>
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