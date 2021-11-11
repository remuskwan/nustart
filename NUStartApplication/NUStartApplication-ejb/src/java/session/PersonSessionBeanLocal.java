package session;

import entity.Category;
import entity.Contact;
import entity.Facility;
import entity.Guide;
import entity.Map;
import entity.Person;
import entity.Post;
import error.InvalidLoginException;
import error.NoResultException;
import error.UserBlockedException;
import error.UserEmailExistException;
import error.UserRejectedException;
import error.UserUnapprovedException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author dengxueqi
 */
@Local
public interface PersonSessionBeanLocal {

    public Long login(String email, String password) throws InvalidLoginException, UserBlockedException, UserRejectedException, UserUnapprovedException, NoResultException;

    public Person getPerson(Long pId) throws NoResultException;

    public Person getPersonByEmail(String email) throws NoResultException;

    public void createUser(Person p) throws UserEmailExistException, UnknownPersistenceException;

    public void updateUser(Person p) throws NoResultException;

    public void deletePerson(Long pId) throws NoResultException;

    public List<Contact> getContacts();
    
    public List<Contact> addContact(Long pId, Contact c);
    
    public List<Contact> deleteContact(Long pId, Long contactId) throws NoResultException;

    public List<Person> searchUsers(String username);

    public List<Person> getAllStaff();

    public List<Person> getAllStudents();

    public List<Category> getCategories();

    public void addCategories(Category c);

    public void updateCategory(Category c);

    public void deleteCategory(Long cId) throws NoResultException;

    public List<Facility> getFacilities();

    public void addFacility(Facility f);

    public void updateFacility(Facility f);

    public void deleteFacility(Long fId);

    public List<Map> getMaps();
    
    public Map getMap(Long mId) throws NoResultException;

    public void addMap(Map m);

    public void updateMap(Map m);

    public void deleteMap(Long mId) throws NoResultException;

    public List<Person> searchByEmail(String email);

    public List<Person> searchByFaculty(String faculty);

    public List<Person> searchByCourse(String course);

    public List<Person> searchByStudent();

    public List<Person> searchByStaff();

    public List<Guide> getGuidesCreated(Long pId);

    public List<Thread> getThreadsCreated(Long pId);

    public List<Post> getPostsCreated(Long pId);
}
