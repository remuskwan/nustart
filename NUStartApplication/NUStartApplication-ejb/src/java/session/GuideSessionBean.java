/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Category;
import entity.Comment;
import entity.Guide;
import entity.Person;
import error.NoResultException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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
public class GuideSessionBean implements GuideSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private PersonSessionBeanLocal personSessionBeanLocal;

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
    public List<Category> getCategories() {
        Query q = em.createQuery("SELECT c FROM Category c");
        return q.getResultList();
    }

    @Override
    public void updateGuide(Guide g) throws NoResultException {
        try {
            Guide oldG = getGuide(g.getId());
            oldG.setTitle(g.getTitle());
            oldG.setContent(g.getContent());
//            if (g.getPublished()) {
//                oldG.setDatePublished(new Date());
//            } else {
//                oldG.setDateUpdated(new Date());
//            }
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
    public List<Guide> searchGuidesByCreator(String email) throws NoResultException {
        Person creator = personSessionBeanLocal.getPersonByEmail(email);
        Query q = em.createQuery("SELECT g FROM Guide g WHERE g.creator = :creator");
        q.setParameter("creator", creator);
        return q.getResultList();
    }

    @Override
    public void addComment(Long gId, Comment c) throws NoResultException {
        Guide guide = getGuide(gId);
        c.setContent(c.getContent().trim());
        em.persist(c);
        guide.getComments().add(c);
    }

    @Override
    public void editComment(Comment c) throws NoResultException {
        Comment oldC = em.find(Comment.class, c.getId());
        oldC.setContent(c.getContent().trim());
    }

    @Override
    public void deleteComment(Long gId, Long cId) throws NoResultException {
        Guide g = getGuide(gId);
        Comment c = em.find(Comment.class, cId);

        if (g != null) {
            g.getComments().remove(c);
            em.remove(c);
        } else {
            throw new NoResultException("Not found");
        }
    }

    @Override
    public List<Comment> getCommentReplies(Long cId) throws NoResultException{
        Query q = em.createQuery("SELECT c FROM Comment c WHERE c.parent.id = :cId");
        q.setParameter("cId", cId);
        return q.getResultList();
    }

    @Override
    public List<Comment> getComments(Long gId) throws NoResultException{
        Guide guide = getGuide(gId);
        return guide.getComments();
    }
}
