/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Post;
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
public class PostSessionBean implements PostSessionBeanLocal {
    
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Post> searchPosts(Long tId, String content) {
        Query q;
        if (content != null) {
            q = em.createQuery("SELECT p FROM Post p, Thread t WHERE t.id = :tId AND " 
                    + "LOWER(p.content) LIKE :content");
            q.setParameter("tId", tId);
            q.setParameter("content", "%" + content.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT p FROM Post p, Thread t WHERE t.id = :tId");
            q.setParameter("tId", tId);
        }
        
        return q.getResultList();
    }

    @Override
    public List<Post> searchPostsByCreator(String displayName) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
     public Post getPost(Long pId) throws NoResultException {
        //System.out.println("get post " + pId);
        Post p = em.find(Post.class, pId);
        
        if (p != null) {
            return p;
        } else {
            throw new NoResultException("Post not found");
        }
    }

    @Override
    public entity.Thread getThreadFromPost(Long pId) {
        try {
            Post p = getPost(pId);
            System.out.println(p);
            Query q = em.createQuery("SELECT t FROM Thread t WHERE :post MEMBER OF t.posts");
            q.setParameter("post", p);

            return (entity.Thread) q.getSingleResult();
        } catch (NoResultException ex) {
            return null;
        }
    }
}
