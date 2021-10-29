//package session;
//
//import entity.Contact;
//import entity.Guide;
//import entity.Post;
//import entity.Staff;
//import entity.Thread;
//import error.NoResultException;
//import java.util.List;
//import javax.ejb.Local;
//
///**
// *
// * @author dengxueqi
// */
//@Local
//public interface StaffSessionBeanLocal {
//    public Staff getStaff(Long sId) throws NoResultException;
//    public void createStaff(Staff s);
//    public void updateStaff(Staff s) throws NoResultException;
//    public void deleteStaff(Long sId) throws NoResultException;
//    public List<Staff> searchStaff();
//    public void addContact(Contact c, Long sId) throws NoResultException;
//}
