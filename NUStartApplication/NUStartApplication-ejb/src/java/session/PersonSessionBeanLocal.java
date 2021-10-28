package session;

import entity.Category;
import entity.Contact;
import entity.Facility;
import entity.Map;
import entity.Person;
import error.InvalidLoginException;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author dengxueqi
 */
@Local
public interface PersonSessionBeanLocal {

    public Person administratorLogin(String username, String password) throws InvalidLoginException, NoResultException;
    
    public Person getPerson(Long pId) throws NoResultException;

    public Person getPersonByEmail(String email) throws NoResultException;
    
    public void createStaff(Person p);

    public void createStudent(Person p);

    public void updateStaff(Person s) throws NoResultException;
    
    public void updateStudent(Person s) throws NoResultException;

    public void deletePerson(Long pId) throws NoResultException;

    public void addContact(Contact c, Long pId) throws NoResultException;

    public void blockUser(Long pId) throws NoResultException; 
    
    public void unblockUser(Long pId) throws NoResultException;
    
    public List<Person> searchUsers();
    
    public List<Person> getAllStaff();
    
    public List<Person> getAllStudents();
    
    public List<Category> getCategories();
    
    public void addCategories(Category c);
    
    public void updateCategory(Category c);
    
    public void deleteCategory(String name) throws NoResultException;
    
    public List<Facility> getFacilities();
    
    public void addFacility(Facility f);
    
    public void updateFacility(Facility f);
    
    public void deleteFacility(Long fId);
    
    public List<Map> getMaps();
    
    public void addMap(Map m);
    
    public void updateMap(Map m);
    
    public void deleteMap(Long mId) throws NoResultException;
    
    public void approveStaff(Person staff);
    
    public void rejectStaff(Person staff);
}
