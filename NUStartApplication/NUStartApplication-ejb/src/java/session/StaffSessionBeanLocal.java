package session;

import entity.Contact;
import entity.Guide;
import entity.Staff;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author dengxueqi
 */
@Local
public interface StaffSessionBeanLocal {
    public Staff getStaff(Long sId) throws NoResultException;
    public void createStaff(Staff s);
    public void updateStaff(Staff s) throws NoResultException;
    public void deleteStaff(Staff s) throws NoResultException;
    public void addContact(Contact c, Long sId) throws NoResultException;
    public List<Guide> showGuides(Staff s) throws NoResultException;
    public List<Guide> showFavouriteGuides(Staff s) throws NoResultException;
    //public List<Forum> showForums(Staff s) throws NoResultException;
    //public List<Forum> showFavouriteForums(Staff s) throws NoResultException;
}
