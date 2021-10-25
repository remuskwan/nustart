package session;

import entity.Contact;
import entity.Staff;
import error.NoResultException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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
        staff.setActive(s.isActive());
        staff.setContacts(s.getContacts());
        staff.setEmail(s.getEmail());
        staff.setFavoriteGuides(s.getFavoriteGuides());
        staff.setFavoritePosts(s.getFavoritePosts());
        staff.setProfilePicture(s.getProfilePicture());
        staff.setGuides(s.getGuides());
//        staff.setThreads(s.getThreads());
//        staff.setPosts(s.getPosts());
        staff.setPassword(s.getPassword());
    }

    @Override
    public void deleteStaff(Long sId) throws NoResultException {
        Staff staff = getStaff(sId);

        em.remove(staff);
    }

    @Override
    public void addContact(Contact c, Long sId) throws NoResultException {
        em.persist(c);
        Staff s = getStaff(sId);
        s.getContacts().add(c);
    }

    @Override
    public List<Staff> searchStaff() {
        Query q = em.createQuery("SELECT s FROM Staff s");
        return q.getResultList();
    }
    
}
