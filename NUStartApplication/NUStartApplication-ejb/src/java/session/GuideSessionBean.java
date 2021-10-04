/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Category;
import entity.Comment;
import entity.Guide;
import error.NoResultException;
import java.util.Date;
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
        Guide oldG = em.find(Guide.class, g.getId());
        oldG.setContent(g.getContent());
        oldG.setDateUpdated(g.getDatePublished());
        oldG.setTitle(g.getTitle());
    }
//assume one guide can only belong to one category
    @Override
    public void deleteGuide(Long gId) {
        Guide g = em.find(Guide.class, gId);
        Category c = (Category)em.createQuery("SELECT c FROM Category c WHERE c.guides = :guides")
                .setParameter("guides", g)
                .getSingleResult();
        c.getGuides().remove(g);
        em.remove(g);
    }

    @Override
    public List<Guide> searchGuidesByTitle(String title) {
        Query q = em.createQuery("SELECT g FROM Guide g WHERE g.title = :title");
        q.setParameter("title", title);
        return q.getResultList();
    }
//search by date created
    @Override
    public List<Guide> searchGuidesByDate(Date date) {
        Query q = em.createQuery("SELECT g FROM Guide g WHERE g.dateCreated = :date");
        q.setParameter("date", date);
        return q.getResultList();
    }

    @Override
    public List<Guide> getGuides() {
        Query q = em.createQuery("SELECT g FROM Guide g");
        return q.getResultList();
    }

    @Override
    public void addComment(Long gId, Comment c) {
        Guide g = em.find(Guide.class, gId);
        em.persist(c);
        g.getComments().add(c);
    }

    @Override
    public void editComment(Comment c) {
        Comment oldC = em.find(Comment.class, c.getId());
        oldC.setContent(c.getContent());
    }

    @Override
    public void deleteComment(Long cId) {
        Comment c = em.find(Comment.class, cId);
        Guide g = (Guide)em.createQuery("SELECT g FROM Guide g WHERE g.comments = :comment")
                .setParameter("comment", c)
                .getSingleResult();
        g.getComments().remove(c);
        em.remove(c);
    }

    
}
