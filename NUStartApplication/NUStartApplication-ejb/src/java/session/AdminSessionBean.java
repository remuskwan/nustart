/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Administrator;
import entity.Category;
import entity.Facility;
import entity.Forum;
import entity.Guide;
import entity.Map;
import entity.Staff;
import entity.Student;
import error.InvalidLoginException;
import error.NoResultException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Allie
 */
@Stateless
public class AdminSessionBean implements AdminSessionBeanLocal {

    @PersistenceContext(unitName = "NUStartApplication-ejbPU")
    private EntityManager em;
    
    private StudentSessionBeanLocal studentSessionBeanLocal;
    private StaffSessionBeanLocal staffSessionBeanLocal;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    @Override
    public Administrator retrieveAdministrator(Long aId){
        Administrator admin = em.find(Administrator.class, aId);
        return admin;
    }
    @Override
    public Administrator retrieveAdministratorByEmail(String email) throws NoResultException {
        Query q = em.createQuery("SELECT a FROM Administrator a WHERE a.email = :inEmail");
        q.setParameter("inEmail", email);
        try {
            return (Administrator) q.getSingleResult();
        } catch (Exception e) {
            throw new NoResultException("Admin not found");
        }
    }
    //might be front end idk
    @Override 
    public Administrator administratorLogin(String username, String password) throws InvalidLoginException, NoResultException {
        try {
            //username is email
            Administrator admin = retrieveAdministratorByEmail(username);
            if (admin.getPassword().equals(password)) {
                return admin;
            } else {
                throw new InvalidLoginException("Administrator username does not exist or invalid password!");
            }
        } catch (InvalidLoginException ex) {
            throw new InvalidLoginException("Administrator username does not exist or invalid password!");
        } catch (NoResultException e) {
            throw new NoResultException("Admin not found");
        }
    }

    public void persist(Object object) {
        em.persist(object);
    }
    //block 
    @Override
    public void blockStu(Long uId) throws NoResultException {
        Student stu = studentSessionBeanLocal.getStudent(uId);
        stu.setActive(false);
    }
    //unblock
    @Override
    public void unblockStu(Long uId) throws NoResultException {
        Student stu = studentSessionBeanLocal.getStudent(uId);
        stu.setActive(true);
    }
    @Override
    public void blockStaff(Long uId) throws NoResultException {
        Staff staff = staffSessionBeanLocal.getStaff(uId);
        staff.setActive(false);
    }
    //unblock
    @Override
    public void unblockStaff(Long uId) throws NoResultException {
        Staff staff = staffSessionBeanLocal.getStaff(uId);
        staff.setActive(true);
    }

    
    //CRUD facilities 
    //CRUD map
    //approve /unapprove staff registration
    //get all users
    //get all staff
    //get all students 
    //get all forums
    //get all guides

//CRUD category
    @Override
    public List<Category> getCategories() {
        Query q;
        q = em.createQuery("SELECT c FROM Category c");
        return q.getResultList();
    }

    @Override
    public void addCategories(Category cat) {
        em.persist(cat);
    }

    @Override
    public void updateCat(Category cat) {
        Category oldCat = em.find(Category.class, cat.getId());
        oldCat.setName(cat.getName());
    }

    @Override
    public void deleteCategory(String name) throws NoResultException {
        //if there are guides and forum using category, i cannot delete right?
        Query q = em.createQuery("SELECT distinct c from Category c WHERE c.name = :name");
        q.setParameter("name", name);
        try{
            Category cat = (Category) q.getResultList();
            if(cat != null){
                em.remove(cat);
            }else{
                throw new NoResultException("Category not found");  
            }
        }catch(NoResultException ex){
            throw new NoResultException(" Category not found");
        }


    }
    //CRUD facilities 
    @Override
    public List<Facility> getFacilities() {
        Query q = em.createQuery("select f from Facility f");
        return q.getResultList();
    }

    @Override
    public void addFacility(Facility fac) {
       em.persist(fac);
    }

    @Override
    public void updateFacility(Facility fac) {
        Facility oldFac = em.find(Facility.class, fac.getId());
        oldFac.setName(fac.getName());
        oldFac.setLocation(fac.getLocation());
        oldFac.setOpenHours(fac.getOpenHours());
    }

    @Override
    public void deleteFacility(Long id) {
        Facility fac = em.find(Facility.class, id);
        em.remove(fac);
    }

    @Override
    public List<Map> getMaps() {
        Query q = em.createQuery("select m from Map m");
        return q.getResultList(); }

    @Override
    public void addMap(Map map) {
        em.persist(map);  
    }

    @Override
    public void updateMap(Map map) {
        Map oldMap = em.find(Map.class, map.getId());
        oldMap.setUrl(map.getUrl());
    }

    @Override
    public void deleteMap(Long id) {
        Map map = em.find(Map.class, id);
        em.remove(map);}

    @Override
    public void approveStaff(Staff staff) {
        //check
        staffSessionBeanLocal.createStaff(staff);

    }

    @Override
    public void rejectStaff(Staff staff) {
       //show on front end rejection?
       //or send email?
    }

    @Override
    public List<Staff> getAllStaff() {
        Query q = em.createQuery("select s from Staff s");
        return q.getResultList();
    }

    @Override
    public List<Student> getAllStudents() {
        Query q = em.createQuery("select stu from Student stu");
        return q.getResultList();
    }

    //let remus and xinyue have these methods
    @Override
    public List<Forum> getAllForums() {
        Query q = em.createQuery("select f from Forum f");
        return q.getResultList();
    }

    @Override
    public List<Guide> getAllGuides() {
        Query q = em.createQuery("select g from Guide g"); 
        return q.getResultList();
    }

}
