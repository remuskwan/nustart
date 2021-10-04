package session;

import entity.Contact;
import entity.Guide;
import entity.Student;
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
public class StudentSessionBean implements StudentSessionBeanLocal {
    
    @PersistenceContext
    EntityManager em;

    @Override
    public Student getStudent(Long sId) throws NoResultException {
        Student s = em.find(Student.class, sId);
        
        if (s != null) {
            return s;
        } else {
            throw new NoResultException("Students not found!");
        }
    }

    @Override
    public void createStudent(Student s) {
        em.persist(s);
    }

    @Override
    public void updateStudent(Student s) throws NoResultException {
        Student student = getStudent(s.getId());
        
        student.setFaculty(s.getFaculty());
        student.setCourse(s.getCourse());
        student.setFavoriteGuides(s.getFavoriteGuides());
        //setFavouriteForums
        //setForumPosts
        //setNotifications
        student.setProfilePicture(s.getProfilePicture());
        student.setEmail(s.getEmail());
    }

    @Override
    public void deleteStudent(Student s) throws NoResultException {
        Student student = getStudent(s.getId());
        
        em.remove(student);
    }
    
    @Override
    public void addContact(Contact c, Long sId) throws NoResultException {
        em.persist(c);
        Student s = getStudent(sId);
        s.getContacts().add(c);
    }

    @Override
    public List<Guide> showFavouriteGudies(Student s) throws NoResultException {
        return s.getFavoriteGuides();
    }

    
    
}
