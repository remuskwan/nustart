package session;

import entity.Contact;
import entity.Guide;
import entity.Student;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author dengxueqi
 */
@Local
public interface StudentSessionBeanLocal {
    public Student getStudent(Long sId) throws NoResultException;
    public void createStudent(Student s);
    public void updateStudent(Student s) throws NoResultException;
    public void deleteStudent(Student s) throws NoResultException;
    public void addContact(Contact c, Long sId) throws NoResultException;
    public List<Guide> showFavouriteGudies(Student s) throws NoResultException;
    //public List<Forum> showFavouriteForums(Student s) throws NoResultException;
    //public List<Forum> showForumPosts(Student s) throws NoResultException;
}
