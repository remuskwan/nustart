/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Administrator;
import entity.Forum;
import entity.Thread;
import error.NoResultException;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author remuskwan
 */
@Stateless
public class ForumSessionBean implements ForumSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private AdminSessionBeanLocal adminSessionBeanLocal;
    @EJB
    private ThreadSessionBeanLocal threadSessionBeanLocal;

    @Override
    public Forum getForum(Long fId) throws NoResultException {
        Forum f = em.find(Forum.class, fId);
        
        if (f != null) {
            return f;
        } else {
            throw new NoResultException("Not found");
        }
    }

    @Override
    public void createForum(Long aId, Forum f) throws NoResultException {
        try {
            f.setTitle(f.getTitle().trim());
            f.setDescription(f.getDescription().trim());
            
            Administrator a = adminSessionBeanLocal.retrieveAdministrator(aId);
            em.persist(f);
            a.getForums().add(f);
        } catch (Exception e) {
            throw new NoResultException("User not found");
        }
        
    }

    @Override
    public void updateForum(Forum f) throws NoResultException {
        Forum oldF = getForum(f.getId());
        oldF.setTitle(f.getTitle().trim());
        oldF.setDescription(f.getDescription().trim());
        oldF.setThreads(f.getThreads());
    }

    @Override
    public void deleteForum(Long fId) throws NoResultException {
        Forum f = getForum(fId);
        
        em.remove(f);
    }

    @Override
    public List<Forum> searchForums(String title){
        Query q;
        if (title != null) {
            q = em.createQuery("SELECT f FROM Forum f WHERE " 
                    + "LOWER(f.title) LIKE :title");
            q.setParameter("title", "%" + title.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT f FROM Forum f");
        }
        
        return q.getResultList();
    }

    @Override
    public void addThread(Long fId, Thread t) throws NoResultException {
        Forum f = getForum(fId);
        em.persist(t);
        f.getThreads().add(t);
    }

    @Override
    public void editThread(Long fId, Thread t) throws NoResultException {
        Forum f = getForum(fId);
        Thread oldT = threadSessionBeanLocal.getThread(t.getId());
        f.getThreads().remove(oldT);
        oldT.setTitle(t.getTitle());
        oldT.setClosed(t.getClosed());
        oldT.setPinned(t.getPinned());
        oldT.setPosts(t.getPosts());
        f.getThreads().add(t);
    }

    @Override
    public void deleteThread(Long fId, Long tId) throws NoResultException {
        Thread t = threadSessionBeanLocal.getThread(tId);
        em.remove(t);
    }
    
     @Override
    public List<Thread> searchForumThreads(Long fId, String title) throws NoResultException{
        List<Thread> threads = new ArrayList<>();
        try {
            Forum f = getForum(fId);
            f.getThreads().stream().filter(t -> (t.getTitle().equals(title))).forEachOrdered(t -> {
                threads.add(t);
            });
        } catch (NoResultException ex) {
            throw new NoResultException("Forum not found");
        }
        return threads;
    }
}
