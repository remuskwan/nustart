/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Post;
import entity.Thread;
import error.NoResultException;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface ThreadSessionBeanLocal {
    public Thread getThread(Long tId) throws NoResultException;
    
    public void addPost(Long tId, Post p) throws NoResultException;
    
    public void editPost(Long tId, Post p) throws NoResultException;
    
    public void deletePost(Long tId, Long pId) throws NoResultException;
}
