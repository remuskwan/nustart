/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Post;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.Query;

/**
 *
 * @author remuskwan
 */
@Stateless
public class PostSessionBean implements PostSessionBeanLocal {
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
}
