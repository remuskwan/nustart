/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Guide;
import error.NoResultException;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
    public void updateGuide(Guide g) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteGuide(Long gId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Guide> searchGuidesByTitle(String title) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Guide> searchGuidesByDate(Date date) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    
}
