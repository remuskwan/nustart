/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Comment;
import entity.Guide;
import error.NoResultException;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author remuskwan
 */
@Local
public interface GuideSessionBeanLocal {
    public Guide getGuide(Long gId) throws NoResultException;
    public List<Guide> searchGuidesByTitle(String title) throws NoResultException;
    public List<Guide> searchGuidesByDate(Date date) throws NoResultException;
    public void createGuide(Guide g);
    public void updateGuide(Guide g);
    public void deleteGuide(Long gId);
    public List<Guide> getGuides();
    public void addComment(Long gId, Comment c);
    public void editComment(Comment c);
    public void deleteComment(Long cId);
}
