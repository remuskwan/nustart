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
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author remuskwan
 */
@Stateless
public class ThreadSessionBean implements ThreadSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

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
    public Forum getForumFromThread(Long tId) throws NoResultException {
        Thread t = em.find(Thread.class, tId);

        Query q = em.createQuery("SELECT DISTINCT f FROM Forum f WHERE :thread MEMBER OF f.threads");
        q.setParameter("thread", t);
        Forum f = (Forum) q.getSingleResult();
        if (f != null) {
            return f;
        } else {
            return new Forum();
        }
    }

    @Override
    public Thread getThreadFromPost(Long pId) throws NoResultException {
        Post p = em.find(Post.class, pId);

        Query q = em.createQuery("SELECT DISTINCT t FROM Thread t WHERE :post MEMBER OF t.posts");
        q.setParameter("post", p);
        Thread t = (Thread) q.getSingleResult();
        if (t != null) {
            return t;
        } else {
            return new Thread();
        }
    }

    @Override
    public List<Thread> searchThreads(Long fId, String title) {
        Query q;
        if (title != null) {
            q = em.createQuery("SELECT t FROM Thread t, Forum f WHERE f.id = :fId AND "
                    + "LOWER(t.title) LIKE :title");
            q.setParameter("fId", fId);
            q.setParameter("title", "%" + title.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT t FROM Thread t, Forum f WHERE f.id = :fId");
            q.setParameter("fId", fId);
        }

        return q.getResultList();
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
    public void editPost(Post p) throws NoResultException {
        Post oldP = em.find(Post.class, p.getId());
        oldP.setContent(p.getContent());
        oldP.setLikes(p.getLikes());
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
