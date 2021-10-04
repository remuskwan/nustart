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
import javax.ejb.Local;

/**
 *
 * @author Allie
 */
@Local
public interface AdminSessionBeanLocal {
    
    public Administrator retrieveAdministrator(Long aId);
    public Administrator retrieveAdministratorByEmail(String email) throws NoResultException;
    public Administrator administratorLogin(String username, String password) throws InvalidLoginException, NoResultException;
    //block 
    public void block(Long uId) throws NoResultException;
    //unblock
    public void unblock(Long uId) throws NoResultException;
    //CRUD category
    public List<Category> getCategories();
    public void addCategories(Category cat);
    public void updateCat(Category cat);
    public void deleteCategory(String name) throws NoResultException;
    //CRUD facilities 
    public List<Facility> getFacilities();
    public void addFacility(Facility fac);
    public void updateFacility(Facility fac);
    public void deleteFacility(Long id);
    //CRUD map
    public List<Map> getMaps();
    public void addMap(Map map);
    public void updateMap(Map map);
    public void deleteMap(Long id);
    
    //approve /unapprove staff registration
    public void approveStaff(Staff staff);
    public void rejectStaff(Staff staff);
    
    //get all users - without staff 
    public List<Staff> getAllStaff();
    public List<Student> getAllStudents();

    //get all forums
    public List<Forum> getAllForums();
    //get all guides
    public List<Guide> getAllGuides();
}
