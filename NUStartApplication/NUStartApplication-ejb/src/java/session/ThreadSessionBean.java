/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Post;
import entity.Thread;
import error.NoResultException;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author remuskwan
 */
@Stateless
public class ThreadSessionBean implements ThreadSessionBeanLocal {
    
    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private ForumSessionBeanLocal forumSessionBeanLocal;

    @Override
    public Thread getThread(Long tId) throws NoResultException {
        Thread t = em.find(Thread.class, tId);
        
        if (t != null) {
            return t;
        } else {
            throw new NoResultException("Thread not found");
        }
    }

    @Override
    public void addPost(Long tId, Post p) throws NoResultException {
        try {
            Thread t = getThread(tId);
            em.persist(p);
            t.getPosts().add(p);
        } catch (Exception e) {
            throw new NoResultException("Thread not found");
        }
    }

    @Override
    public void editPost(Long tId, Post p) throws NoResultException {
        Thread t = getThread(tId);
        Post oldP = em.find(Post.class, p.getId());
        t.getPosts().remove(oldP);
        oldP.setContent(p.getContent());
        oldP.setLikes(p.getLikes());
        t.getPosts().add(p);
    }

    @Override
    public void deletePost(Long tId, Long pId) throws NoResultException {
        Thread t = getThread(tId);
        Post p = em.find(Post.class, pId);
        
        if (t != null) {
            t.getPosts().remove(p);
            em.remove(p);
        } else {
            throw new NoResultException("Not found");
        }
    }
    
}
