/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Category;
import entity.Guide;
import entity.Person;
import enumeration.AccountStatus;
import enumeration.AccountType;
import error.NoResultException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;

/**
 *
 * @author remuskwan
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB
    private PersonSessionBeanLocal personSessionBeanLocal;
    @EJB
    private GuideSessionBeanLocal guideSessionBeanLocal;

    public DataInitSessionBean() {
    }

    @PostConstruct
    public void postConstruct() {
        try {
            personSessionBeanLocal.getPersonByEmail("admin01@mail.com");
        } catch (NoResultException ex) {
            initializeData();
        }
    }

    private void initializeData() {
        try {
            //Create person
            Person a = new Person();
            a.setAccountType(AccountType.ADMIN);
            a.setAccountStatus(AccountStatus.ACTIVE);
            a.setEmail("admin01@mail.com");
            a.setPassword("1234567aA@");
            a.setCreated(new Date());
            a.setUsername("Admin01");
            a.setFaculty("default");
            a.setCourse("default");
            a.setYr("default");
            a.setProfilePicture("default");
            a.setCoverImage("default");
            personSessionBeanLocal.createUser(a);
            Person student1 = new Person("johntan@u.nus.edu", "1234567aA@", "John Tan", "default", "default", AccountType.STUDENT, AccountStatus.ACTIVE, "Business", "Business Administration", "1", new Date());
            Person staff1 = new Person("profben@comp.nus.edu", "1234567aA@","Prof. Ben", "default", "default", AccountType.STAFF, AccountStatus.UNAPPROVED, "Computing", "default", "default", new Date());
            personSessionBeanLocal.createUser(student1);
            personSessionBeanLocal.createUser(staff1);
            
//            Guide guide1 = new Guide("Basketball", "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu dui, ornare eget porta sed, tincidunt tempor velit. Morbi quis aliquet felis, eget malesuada ipsum. Nulla luctus dignissim eros ut iaculis. Sed sit amet aliquet erat. Sed laoreet semper massa, sit amet porta mi tristique nec. Aliquam viverra justo in ipsum placerat consectetur. Fusce varius lacus vitae tincidunt eleifend.</p> <p>Sed efficitur turpis eget vulputate hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed mi non lacus finibus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dolor risus, venenatis non tristique eget, placerat in nisi. Maecenas condimentum vulputate arcu a hendrerit. Quisque sit amet augue nulla. Nullam maximus, nulla eu feugiat auctor, quam lorem volutpat metus, non suscipit magna enim nec mauris. In bibendum massa non nisl elementum interdum. Duis pellentesque erat felis, et sagittis metus imperdiet eu. Nulla vitae velit ac tortor gravida porttitor et convallis odio. Proin elit sapien, ornare id commodo a, sagittis at velit. Phasellus placerat lacus sed lectus feugiat tristique in sed nibh.&nbsp;</p>", "", new Date(), staff1);
            Category cat1 = new Category("CCA", new Date(), a);
            personSessionBeanLocal.addCategories(cat1);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
