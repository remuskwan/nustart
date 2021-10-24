import { Route, Switch } from 'react-router';
import HomePage from './app/containers/HomePage';
import './App.css';

function App() {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/register" component={RegisterPage} />
        <Route path="/Users" component={UsersPage} />
        <Route path="/Profile" component={ProfilePage} />
        <Route path="/threadDetails" component={ThreadDetailsPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
