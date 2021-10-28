package session;

import entity.Category;
import entity.Contact;
import entity.Facility;
import entity.Map;
import entity.Person;
import error.NoResultException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import enumeration.AccountType;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author dengxueqi
 */
@Stateless
public class PersonSessionBean implements PersonSessionBeanLocal {

    @PersistenceContext
    EntityManager em;

    @Override
    public Person getPerson(Long pId) throws NoResultException {
        Person p = em.find(Person.class, pId);

        if (p != null) {
            return p;
        } else {
            throw new NoResultException("Person not found!");
        }
    }

    @Override
    public Person getPersonByEmail(String email) throws NoResultException {
        Query q = em.createQuery("SELECT p FROM Person p WHERE p.email = :e");
        q.setParameter("e", email);
        return (Person) q.getSingleResult();
    }
    
    @Override
    public void createUser(Person p) {
        em.persist(p);
    }
   

//    @Override
//    public void createStaff(Person p) {
//        p.setAccountType(AccountType.STAFF);
//        em.persist(p);
//    }
//
//    @Override
//    public void createStudent(Person p) {
//        p.setAccountType(AccountType.STUDENT);
//        em.persist(p);
//    }
//    
    @Override
    public void updateUser(Person s) throws NoResultException{
        Person user = getPerson(s.getId());

        user.setFaculty(s.getFaculty());
        user.setCourse(s.getCourse());
        user.setFavoriteGuides(s.getFavoriteGuides());
        user.setFavoriteGuides(s.getFavoriteGuides());
        user.setFavoritePosts(s.getFavoritePosts());
        user.setContacts(s.getContacts());
        user.setProfilePicture(s.getProfilePicture());
        user.setEmail(s.getEmail());
        user.setActive(s.isActive());
        user.setPassword(s.getPassword());
        user.setYr(s.getYr());
    }

//    @Override
//    public void updateStaff(Person s) throws NoResultException {
//        Person staff = getPerson(s.getId());
//        staff.setActive(s.isActive());
//        staff.setContacts(s.getContacts());
//        staff.setEmail(s.getEmail());
//        staff.setFavoriteGuides(s.getFavoriteGuides());
//        staff.setFavoritePosts(s.getFavoritePosts());
//        staff.setProfilePicture(s.getProfilePicture());
//        staff.setPassword(s.getPassword());
//        staff.setFaculty(s.getFaculty());
//    }
//
//    @Override
//    public void updateStudent(Person s) throws NoResultException {
//        Person student = getPerson(s.getId());
//
//        student.setFaculty(s.getFaculty());
//        student.setCourse(s.getCourse());
//        student.setFavoriteGuides(s.getFavoriteGuides());
//        student.setFavoriteGuides(s.getFavoriteGuides());
//        student.setFavoritePosts(s.getFavoritePosts());
//        student.setContacts(s.getContacts());
//        student.setProfilePicture(s.getProfilePicture());
//        student.setEmail(s.getEmail());
//        student.setActive(s.isActive());
//        student.setPassword(s.getPassword());
//        student.setYr(s.getYr());
//    }

    @Override
    public void deletePerson(Long pId) throws NoResultException {
        Person p = getPerson(pId);
        p.setDeleted(true);
    }

    @Override
    public void addContact(Contact c, Long pId) throws NoResultException {
        em.persist(c);
        Person p = getPerson(pId);
        p.getContacts().add(c);
    }

    @Override
    public void blockUser(Long pId) throws NoResultException {
        Person p = getPerson(pId);
        p.setActive(false);
    }

    @Override
    public void unblockUser(Long pId) throws NoResultException {
        Person p = getPerson(pId);
        p.setActive(true);
    }

    @Override
    public List<Person> searchUsers(String username) {
        Query q;
        if (username != null) {
            q = em.createQuery("SELECT p FROM Person p WHERE "
                    + "LOWER(p.username) LIKE :username");
            q.setParameter("username", "%" + username.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT p FROM Person p");
        }
        
        return q.getResultList();
    }

    @Override
    public List<Person> getAllStaff() {
        Query q = em.createQuery("SELECT p FROM Person p WHERE p.accountType = :type");
        q.setParameter("type", AccountType.STAFF);
        return q.getResultList();
    }

    @Override
    public List<Person> getAllStudents() {
        Query q = em.createQuery("SELECT p FROM Person p WHERE p.accountType = :type");
        q.setParameter("type", AccountType.STUDENT);
        return q.getResultList();
    }

    @Override
    public List<Category> getCategories() {
        Query q = em.createQuery("SELECT c FROM Category c");
        return q.getResultList();
    }

    @Override
    public void addCategories(Category c) {
        em.persist(c);
    }

    @Override
    public void updateCategory(Category c) {
        Category oldC = em.find(Category.class, c.getId());
        oldC.setName(c.getName());
    }

    @Override
    public void deleteCategory(String name) throws NoResultException {
        //if there are guides and forum using category, i cannot delete right?
        Query q = em.createQuery("SELECT DISTINCT c from Category c WHERE c.name = :name");
        q.setParameter("name", name);
        try {
            Category c = (Category) q.getResultList();
            if (c != null) {
                em.remove(c);
            } else {
                throw new NoResultException("Category not found");
            }
        } catch (NoResultException ex) {
            throw new NoResultException("Category not found");
        }
    }

    @Override
    public List<Facility> getFacilities() {
        Query q = em.createQuery("select f from Facility f");
        return q.getResultList();
    }

    @Override
    public void addFacility(Facility f) {
        em.persist(f);
    }

    @Override
    public void updateFacility(Facility f) {
        Facility oldF = em.find(Facility.class, f.getId());
        oldF.setName(f.getName());
        oldF.setLocation(f.getLocation());
        oldF.setOpenHours(f.getOpenHours());
    }

    @Override
    public void deleteFacility(Long fId) {
        Facility f = em.find(Facility.class, fId);
        em.remove(f);
    }

    @Override
    public List<Map> getMaps() {
        Query q = em.createQuery("select m from Map m");
        return q.getResultList();
    }

    @Override
    public void addMap(Map m) {
        em.persist(m);
    }

    @Override
    public void updateMap(Map m) {
        Map oldMap = em.find(Map.class, m.getId());
        oldMap.setUrl(m.getUrl());
    }

    @Override
    public void deleteMap(Long mId) {
        Map map = em.find(Map.class, mId);
        em.remove(map);
    }

    @Override
    public void approveStaff(Person staff) {
        //check
        createUser(staff);
    }

    @Override
    public void rejectStaff(Person staff) {
        //show on front end rejection?
       //or send email?
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    
}
