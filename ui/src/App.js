import { Route, Switch } from 'react-router';
import PublicRoute from './app/util/routes/PublicRoute';
import PrivateRoute from './app/util/routes/PrivateRoute';
import HomePage from './app/containers/HomePage';

function App() {
  return (
    <div className="content">
      <Switch>
        {/* NOTE: replace with PrivateRoute once LoginPage is complete */}
        <Route exact path="/" component={HomePage} /> 
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
