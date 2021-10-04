package session;

import entity.Contact;
import entity.Guide;
import entity.Staff;
import error.NoResultException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author dengxueqi
 */
@Stateless
public class StaffSessionBean implements StaffSessionBeanLocal {

    @PersistenceContext
    EntityManager em;

    @Override
    public Staff getStaff(Long sId) throws NoResultException {
        Staff s = em.find(Staff.class, sId);

        if (s != null) {
            return s;
        } else {
            throw new NoResultException("Staff not found!");
        }
    }

    @Override
    public void createStaff(Staff s) {
        em.persist(s);
    }

    @Override
    public void updateStaff(Staff s) throws NoResultException {
        Staff staff = getStaff(s.getId());
        staff.setGuides(s.getGuides());
        staff.setFavoriteGuides(s.getFavoriteGuides());
        //setForums
        //setFavouriteForums
    }

    @Override
    public void deleteStaff(Staff s) throws NoResultException {
        Staff staff = getStaff(s.getId());

        em.remove(staff);
    }

    @Override
    public void addContact(Contact c, Long sId) throws NoResultException {
        em.persist(c);
        Staff s = getStaff(sId);
        s.getContacts().add(c);
    }

    @Override
    public List<Guide> showGuides(Staff s) throws NoResultException {
        return s.getGuides();
    }

    @Override
    public List<Guide> showFavouriteGuides(Staff s) throws NoResultException {
        return s.getFavoriteGuides();
    }

//    @Override
//    public List<Forum> showForums(Staff s) throws NoResultException {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }
//    @Override
//    public List<Forum> showFavouriteForums(Staff s) throws NoResultException {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }
}
