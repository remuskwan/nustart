import { Route, Switch } from 'react-router';
import PublicRoute from './app/util/routes/PublicRoute';
import PrivateRoute from './app/util/routes/PrivateRoute';
import AddForumPage from './app/containers/AddForumPage';
import AddThreadPage from './app/containers/AddThreadPage';
import AddPostPage from './app/containers/AddPostPage';
import ProfilePage from './app/containers/ProfilePage';
import ForumsPage from './app/containers/ForumsPage';
import ForumDetailsPage from './app/containers/ForumDetailsPage';
import ThreadDetailsPage from './app/containers/ThreadDetailsPage';

function App() {
  return (
    <div className="content">
      <Switch>
        {/* NOTE: replace with PrivateRoute once LoginPage is complete */}
        <Route exact path="/" component={ForumsPage} /> 
        {/* <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} /> */}
        <Route exact path='/:id/threads' component={ForumDetailsPage} />
        <Route exact path="/:forumId/threads/:threadId/posts" component={ThreadDetailsPage} />
        <Route path="/create" component={AddForumPage} />
        <Route path="/:id/threads/create" component={AddThreadPage} />
        <Route exact path="/profile" component={ProfilePage}/>
        <Route path="/:forumId/threads/:threadId/posts/create" component={AddPostPage} />
        {/* <PrivateRoute path="/profile/edit" component={EditProfile} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Redirect exact from="/:id" to="/:id/threads" />
        <Redirect exact from="/:forumId/threads/:threadId" to="/:forumId/threads/:threadId/posts" /> */}
      </Switch>
    </div>
  );
}

export default App;
