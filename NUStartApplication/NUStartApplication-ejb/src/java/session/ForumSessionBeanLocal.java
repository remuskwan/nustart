/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Forum;
import entity.Thread;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface ForumSessionBeanLocal {
    public Forum getForum(Long fId) throws NoResultException;
    
    public void createForum(Long aId, Forum f) throws NoResultException;
    
    public void updateForum(Forum f) throws NoResultException;
    
    public void deleteForum(Long fId) throws NoResultException;
    
    public List<Forum> searchForums(String title);
    
    public void addThread(Long fId, Thread t) throws NoResultException;
    
    public void editThread(Long fId, Thread tId) throws NoResultException;
    
    public void deleteThread(Long fId, Long tId) throws NoResultException;
    
    public List<Thread> searchForumThreads(Long fId, String title) throws NoResultException;
}
