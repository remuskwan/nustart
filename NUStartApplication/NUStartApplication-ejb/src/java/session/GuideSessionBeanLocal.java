/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Guide;
import entity.Person;
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
    public List<Guide> searchGuidesByCreator(Person creator);    
    public void createGuide(Guide g);    
    public void updateGuide(Guide g) throws NoResultException;    
    public void deleteGuide(Long gId) throws NoResultException;
}
