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
    public void createForum(Forum f) {
        f.setTitle(f.getTitle().trim());
        f.setDescription(f.getDescription().trim());

        em.persist(f);
        f.getCreator().getForums().add(f);
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
    public void editThread(Thread t) throws NoResultException {
        Thread oldT = threadSessionBeanLocal.getThread(t.getId());
        oldT.setTitle(t.getTitle().trim());
        oldT.setPosts(t.getPosts());
        oldT.setClosed(t.getClosed());
        oldT.setPinned(t.getPinned());
    }

    @Override
    public void deleteThread(Long tId) throws NoResultException {
        Thread t = threadSessionBeanLocal.getThread(tId);
        em.remove(t);
    }
}
