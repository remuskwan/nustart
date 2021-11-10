/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Forum;
import entity.Post;
import entity.Thread;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface ThreadSessionBeanLocal {

    public Thread getThread(Long tId) throws NoResultException;

    public Forum getForumFromThread(Long tId) throws NoResultException;

    public List<Thread> searchThreads(Long fId, String title);

    public void addPost(Long tId, Post p) throws NoResultException;

    public void editPost(Post p) throws NoResultException;

    public void deletePost(Long tId, Long pId) throws NoResultException;
}
