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
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface GuideSessionBeanLocal {
    public Guide getGuide(Long gId) throws NoResultException;
    public List<Guide> searchGuides();    
    public List<Guide> searchGuidesByTitle(String title);    
    public List<Guide> searchGuidesByCreator(String email) throws NoResultException;    
    public void createGuide(Long cId, Guide g) throws NoResultException;     
    public Category getCategoryFromGuide(Long gId) throws NoResultException;
    public void updateGuide(Guide g) throws NoResultException;    
    public void deleteGuide(Long cId, Long gId) throws NoResultException;
    public List<Category> getCategories();
    public void addComment(Long gId, Comment c) throws NoResultException;
    public void editComment(Comment c) throws NoResultException;
    public void deleteComment(Long gId, Long cId) throws NoResultException;
    public List<Comment> getCommentReplies(Long cId)throws NoResultException;
    public List<Comment> getComments(Long gId)throws NoResultException;
    public Category getCategory(Long cId) throws NoResultException;
//    public void addLink(Long gId, Link l) throws NoResultException;
//    public void editLink(Link l) throws NoResultException;
//    public void deleteLink(Long gId, Long lId) throws NoResultException;
}
