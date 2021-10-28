import { Route, Switch } from 'react-router';
import PublicRoute from './app/util/routes/PublicRoute';
import PrivateRoute from './app/util/routes/PrivateRoute';
import HomePage from './app/containers/HomePage';
import AddForumPage from './app/containers/AddForumPage';
import AddThreadPage from './app/containers/AddPostPage';

function App() {
  return (
    <div className="content">
      <Switch>
        {/* NOTE: replace with PrivateRoute once LoginPage is complete */}
        <Route exact path="/" component={HomePage} /> 
        {/* <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} /> */}
        {/* <Route exact path={'/:id/threads'} component={ForumDetailsPage} />
        <Route path="/:forumId/threads/:threadId/posts" component={ThreadDetailsPage} /> */}
        <Route path="/create" component={AddForumPage} />
        <Route path="/:id/threads/create" component={AddThreadPage} />
        {/* <PrivateRoute path="/addPost" component={AddPostPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage}/>
        <PrivateRoute path="/profile/edit" component={EditProfile} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Redirect exact from="/:id" to="/:id/threads" />
        <Redirect exact from="/:forumId/threads/:threadId" to="/:forumId/threads/:threadId/posts" /> */}
      </Switch>
    </div>
  );
}

export default App;
