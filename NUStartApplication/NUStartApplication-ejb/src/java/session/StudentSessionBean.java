package session;

import entity.Contact;
import entity.Student;
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
        student.setFavoriteGuides(s.getFavoriteGuides());
        student.setFavoritePosts(s.getFavoritePosts());
//        student.setPosts(s.getPosts());
        student.setContacts(s.getContacts());
        student.setProfilePicture(s.getProfilePicture());
        student.setEmail(s.getEmail());
        student.setActive(s.isActive());
        student.setPassword(s.getPassword());
    }

    @Override
    public void deleteStudent(Long sId) throws NoResultException {
        Student student = getStudent(sId);
        
        em.remove(student);
    }
    
    @Override
    public void addContact(Contact c, Long sId) throws NoResultException {
        em.persist(c);
        Student s = getStudent(sId);
        s.getContacts().add(c);
    }

    @Override
    public List<Student> searchStudents() {
        Query q = em.createQuery("SELECT s FROM Student s");
        return q.getResultList();
    }

    
    
}
