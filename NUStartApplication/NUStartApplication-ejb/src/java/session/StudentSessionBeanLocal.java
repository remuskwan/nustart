package session;

import entity.Contact;
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
    public void deleteStudent(Long sId) throws NoResultException;
    public void addContact(Contact c, Long sId) throws NoResultException;
    public List<Student> searchStudents();
}
