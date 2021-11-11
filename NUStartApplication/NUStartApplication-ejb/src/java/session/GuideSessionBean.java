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
    public void createGuide(Long cId, Guide g) throws NoResultException {
        g.setTitle(g.getTitle().trim());
        g.setContent(g.getContent().trim());
        Category c = getCategory(cId);
        em.persist(g);
        c.getGuides().add(g);
    }

    @Override
    public List<Category> getCategories() {
        Query q = em.createQuery("SELECT c FROM Category c");
        return q.getResultList();
    }

    public Category getCategoryFromGuide(Long gId) throws NoResultException {
        try {
            Guide g = getGuide(gId);
            Query q = em.createQuery("SELECT DISTINCT c FROM Category c WHERE :guide MEMBER OF c.guides");
            q.setParameter("guide", g);

            return (Category) q.getSingleResult();
        } catch (Exception e) {
            throw new NoResultException("Guide not found!");
        }
    }

    @Override
    public void updateGuide(Guide g) throws NoResultException {
        try {
            Guide oldG = getGuide(g.getId());
            oldG.setTitle(g.getTitle());
            oldG.setContent(g.getContent());
            oldG.setPictureUrl(g.getPictureUrl());
            oldG.setFiles(g.getFiles());
//            oldG.setLinks(g.getLinks());
        } catch (NoResultException ex) {
            Logger.getLogger(GuideSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public void deleteGuide(Long cId, Long gId) throws NoResultException {
        Category c = getCategory(cId);
        Guide g = getGuide(gId);

        if (c != null) {
            c.getGuides().remove(g);
            em.remove(g);
        } else {
            throw new NoResultException("Not found");
        }
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
    public List<Comment> getCommentReplies(Long cId) throws NoResultException {
        Query q = em.createQuery("SELECT c FROM Comment c WHERE c.parent.id = :cId");
        q.setParameter("cId", cId);
        return q.getResultList();
    }

    @Override
    public List<Comment> getComments(Long gId) throws NoResultException {
        Guide guide = getGuide(gId);
        return guide.getComments();
    }

    @Override
    public Category getCategory(Long cId) throws NoResultException {
        Category f = em.find(Category.class, cId);

        if (f != null) {
            return f;
        } else {
            throw new NoResultException("Not found");
        }
    }

//    @Override
//    public void addLink(Long gId, Link l) throws NoResultException {
//        Guide guide = getGuide(gId);
//        l.setName(l.getName().trim());
//        em.persist(l);
//        guide.getLinks().add(l);
//    }
//
//    @Override
//    public void editLink(Link l) throws NoResultException {
//        Link oldL = em.find(Link.class, l.getId());
//        oldL.setName(l.getName().trim());
//        oldL.setURL(l.getURL().trim());
//    }
//
//    @Override
//    public void deleteLink(Long gId, Long lId) throws NoResultException {
//        Guide g = getGuide(gId);
//        Link l = em.find(Link.class, lId);
//
//        if (g != null) {
//            g.getLinks().remove(l);
//            em.remove(l);
//        } else {
//            throw new NoResultException("Not found");
//        }
//    }
}
