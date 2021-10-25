import { Route, Switch } from 'react-router';
import { PrivateRoute, PublicRoute } from './app/util/routes'
import HomePage from './app/containers/HomePage';
import './App.css';

function App() {
  return (
    <div className="content">
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        {/* <PublicRoute path="/register" component={RegisterPage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/threadDetails" component={ThreadDetailsPage} />
        <PrivateRoute path="/forumDetails" component={ForumDetailsPage} />
        <PrivateRoute path="/addThread" component={AddThreadPage} />
        <PublicRoute path="/login" component={LoginPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
