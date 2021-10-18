/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Guide;
import entity.Person;
import error.NoResultException;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author remuskwan
 */
@Stateless
public class GuideSessionBean implements GuideSessionBeanLocal {
    
    @PersistenceContext
    private EntityManager em;

    @Override
    public Guide getGuide(Long gId) throws NoResultException {
        Guide guide = em.find(Guide.class, gId);
        if (guide != null) {
            return guide;
        } else {
            throw new NoResultException("Not found");
        }
    }

    @Override
    public void createGuide(Guide g) {
        em.persist(g);
    }

    @Override
    public void updateGuide(Guide g) throws NoResultException {
        try {
            Guide oldG = getGuide(g.getId());
            oldG.setTitle(g.getTitle());
            oldG.setContent(g.getContent());
            if (g.getPublished()) {
                oldG.setDatePublished(new Date());
            } else {
                oldG.setDateUpdated(new Date());
            }
        } catch (NoResultException ex) {
            Logger.getLogger(GuideSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }

    @Override
    public void deleteGuide(Long gId) throws NoResultException {
        Guide g = getGuide(gId);
        em.remove(g);
    }
    
    @Override
    public List<Guide> searchGuides() {
        Query q = em.createQuery("SELECT g FROM Guide g");
        return q.getResultList();
    }

    @Override
    public List<Guide> searchGuidesByTitle(String title) {
        Query q;
        if (title != null) {
            q = em.createQuery("SELECT g FROM Guide g WHERE " 
                    + "LOWER(g.title) LIKE :title");
            q.setParameter("title", "%" + title.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT g FROM Guide g");
        }
        
        return q.getResultList();
    }

    @Override
    public List<Guide> searchGuidesByCreator(Person creator){
        Query q = em.createQuery("SELECT g FROM Guide g WHERE g.creator = :creator");
        q.setParameter("creator", creator);
        return q.getResultList();
    }
}
