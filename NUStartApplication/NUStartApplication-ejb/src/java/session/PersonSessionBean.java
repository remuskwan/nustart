package session;

import entity.Category;
import entity.Contact;
import entity.Facility;
import entity.Guide;
import entity.Map;
import entity.Person;
import entity.Post;
import enumeration.AccountStatus;
import error.NoResultException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import enumeration.AccountType;
import error.InvalidLoginException;
import error.UserBlockedException;
import error.UserEmailExistException;
import error.UserRejectedException;
import error.UserUnapprovedException;
import java.util.List;
import javax.ejb.EJB;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

/**
 *
 * @author dengxueqi
 */
@Stateless
public class PersonSessionBean implements PersonSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @EJB
    private GuideSessionBeanLocal guideSessionBeanLocal;

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
        try {
            return (Person) q.getSingleResult();
        } catch (Exception e) {
            throw new NoResultException("User not found");
        }
    }

    @Override
    public Long login(String email, String password) throws InvalidLoginException, UserBlockedException, UserUnapprovedException, UserRejectedException, NoResultException {
        try {
            Person p = getPersonByEmail(email);
            if (!p.getPassword().equals(password)) {
                throw new InvalidLoginException("Invalid email address or password");
            } else if (p.getAccountStatus().equals(AccountStatus.BLOCKED)) {
                throw new UserBlockedException("User blocked");
            } else if (p.getAccountStatus().equals(AccountStatus.UNAPPROVED)) {
                throw new UserUnapprovedException("Please wait to be approved");
            } else if (p.getAccountStatus().equals(AccountStatus.REJECTED)) {
                throw new UserRejectedException("You have been rejected.");
            } else {
                return p.getId();
            }
        } catch (NoResultException e) {
            throw new NoResultException("User not found");
        }
    }

    @Override
    public void createUser(Person p) throws UserEmailExistException, UnknownPersistenceException {
        try {
            em.persist(p);
        } catch (PersistenceException ex) {
            if (ex.getCause().getCause() != null
                    && ex.getCause().getCause().getClass().getName().equals("org.apache.derby.shared.common.error.DerbySQLIntegrityConstraintViolationException")) {
                throw new UserEmailExistException("Account already exists");
            } else {
                throw new UnknownPersistenceException(ex.getMessage());
            }
        }

    }

    @Override
    public void updateUser(Person s) throws NoResultException {
        Person user = getPerson(s.getId());

        user.setAccountStatus(s.getAccountStatus());
        user.setAccountType(s.getAccountType());
        user.setFaculty(s.getFaculty().trim());
        user.setCourse(s.getCourse().trim());
        user.setProfilePicture(s.getProfilePicture());
        user.setCoverImage(s.getCoverImage());
        user.setLikedGuides(s.getLikedGuides());
        user.setLikedPosts(s.getLikedPosts());
        user.setEmail(s.getEmail().trim());
        user.setPassword(s.getPassword());
        user.setUsername(s.getUsername().trim());
        user.setYr(s.getYr().trim());
    }

    @Override
    public void deletePerson(Long pId) throws NoResultException {
        Person p = getPerson(pId);
        em.remove(p);
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
        p.setAccountStatus(AccountStatus.BLOCKED);
    }

    @Override
    public void unblockUser(Long pId) throws NoResultException {
        Person p = getPerson(pId);
        p.setAccountStatus(AccountStatus.ACTIVE);
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
    public void deleteCategory(Long cId) throws NoResultException {
        //if there are guides and forum using category, i cannot delete right? yes
        Category c = guideSessionBeanLocal.getCategory(cId);
        em.remove(c);
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
    public void deleteMap(Long mId) throws NoResultException {
        Map map = em.find(Map.class, mId);
        try {
            if (map != null) {
                em.remove(map);
            } else {
                throw new NoResultException("Map not found");
            }
        } catch (NoResultException ex) {
            throw new NoResultException("Map not found");
        }
    }

    @Override
    public void approveStaff(Person staff) {
        //check
//        createUser(staff);
    }

    @Override
    public void rejectStaff(Person staff) {
        //show on front end rejection?
        //or send email?
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int getContacts() {
        return em.createQuery("SELECT c FROM Contact c").getResultList().size();
    }

    @Override
    public List<Person> searchByEmail(String email) {
        Query q;
        if (email != null) {
            q = em.createQuery("SELECT u FROM Person u WHERE "
                    + "LOWER(u.email) LIKE :email");
            q.setParameter("email", "%" + email.toLowerCase() + "%");
        } else {
            //show everyone or show nothing?
            q = em.createQuery("SELECT p FROM Person p");
        }

        return q.getResultList();
    }

    @Override
    public List<Person> searchByFaculty(String faculty) {
        Query q;
        if (faculty != null) {
            q = em.createQuery("SELECT u FROM Person u WHERE "
                    + "LOWER(u.faculty) LIKE :faculty");
            q.setParameter("faculty", "%" + faculty.toLowerCase() + "%");
        } else {
            //show everyone or show nothing?
            q = em.createQuery("SELECT p FROM Person p");
        }

        return q.getResultList();
    }

    @Override
    public List<Person> searchByCourse(String course) {
        Query q;
        if (course != null) {
            q = em.createQuery("SELECT u FROM Person u WHERE "
                    + "LOWER(u.course) LIKE :course");
            q.setParameter("course", "%" + course.toLowerCase() + "%");
        } else {
            //show everyone or show nothing?
            q = em.createQuery("SELECT p FROM Person p");
        }

        return q.getResultList();
    }

    @Override
    public List<Person> searchByStaff() {
        Query q;
        q = em.createQuery("SELECT u FROM Person u");

        if (q != null) {
            q = em.createQuery("SELECT u FROM Person u where u.accountType LIKE 1");

        } else {
            //show everyone or show nothing?
            q = em.createQuery("SELECT p FROM Person p");
        }

        return q.getResultList();
    }

    @Override
    public List<Person> searchByStudent() {
        Query q;
        q = em.createQuery("SELECT u FROM Person u");

        if (q != null) {
            q = em.createQuery("SELECT u FROM Person u where u.accountType LIKE 0");

        } else {
            //show everyone or show nothing?
            q = em.createQuery("SELECT p FROM Person p");
        }

        return q.getResultList();
    }

    @Override
    public List<Guide> getGuidesCreated(Long pId) {
        Query q = em.createQuery("SELECT g FROM Guide g WHERE g.creator.id = :id");
        q.setParameter("id", pId);

        return q.getResultList();
    }

    @Override
    public List<Thread> getThreadsCreated(Long pId) {
        Query q = em.createQuery("SELECT t FROM Thread t WHERE t.creator.id = :id");
        q.setParameter("id", pId);
        return q.getResultList();
    }

    @Override
    public List<Post> getPostsCreated(Long pId) {
        Query q = em.createQuery("SELECT p FROM Post p WHERE p.creator.id = :id");
        q.setParameter("id", pId);
        return q.getResultList();
    }

}
