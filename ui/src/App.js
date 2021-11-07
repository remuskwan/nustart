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
import UsersPage from './app/containers/UsersPage';
import GuidesPage from './app/containers/GuidesPage';

function App() {
  return (
    <div className="content">
      <Switch>
        <PrivateRoute exact path="/" component={ForumsPage} /> 
        <PrivateRoute path="/guides" component={GuidesPage} /> 
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />
        <PrivateRoute exact path='/:id/threads' component={ForumDetailsPage} />
        <PrivateRoute exact path="/:forumId/threads/:threadId/posts" component={ThreadDetailsPage} />
        <PrivateRoute path="/create" component={AddForumPage} />
        <PrivateRoute path="/:id/threads/create" component={AddThreadPage} />
        <PrivateRoute exact path="/profile/:uid" component={ProfilePage}/>
        <PrivateRoute exact path="/users" component={UsersPage}/>
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
