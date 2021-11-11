/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Post;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface PostSessionBeanLocal {

    public List<Post> searchPosts(Long tId, String content);

    public List<Post> searchPostsByCreator(String displayName);

    public Post getPost(Long pId) throws NoResultException;

    public entity.Thread getThreadFromPost(Long pId);
}
