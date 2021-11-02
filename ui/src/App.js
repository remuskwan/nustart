import { Switch } from 'react-router';
import PublicRoute from './app/util/routes/PublicRoute';
import PrivateRoute from './app/util/routes/PrivateRoute';
import AddForumPage from './app/containers/AddForumPage';
import AddThreadPage from './app/containers/AddThreadPage';
import AddPostPage from './app/containers/AddPostPage';
import ProfilePage from './app/containers/ProfilePage';
import ForumsPage from './app/containers/ForumsPage';
import ForumDetailsPage from './app/containers/ForumDetailsPage';
import LoginPage from './app/containers/LoginPage';
import RegisterPage from './app/containers/RegisterPage'
import ThreadDetailsPage from './app/containers/ThreadDetailsPage';

function App() {
  return (
    <div className="content">
      <Switch>
        {/* NOTE: replace with PrivateRoute once LoginPage is complete */}
        <PrivateRoute exact path="/" component={ForumsPage} /> 
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />
        <PrivateRoute exact path='/:id/threads' component={ForumDetailsPage} />
        <PrivateRoute exact path="/:forumId/threads/:threadId/posts" component={ThreadDetailsPage} />
        <PrivateRoute path="/create" component={AddForumPage} />
        <PrivateRoute path="/:id/threads/create" component={AddThreadPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage}/>
        <PrivateRoute path="/:forumId/threads/:threadId/posts/create" component={AddPostPage} />
        {/* <PrivateRoute path="/profile/edit" component={EditProfile} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Redirect exact from="/:id" to="/:id/threads" />
        <Redirect exact from="/:forumId/threads/:threadId" to="/:forumId/threads/:threadId/posts" /> */}
      </Switch>
    </div>
  );
}

export default App;
