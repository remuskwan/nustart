/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Category;
import entity.Forum;
import entity.Guide;
import entity.Thread;
import entity.Map;
import entity.Person;
import entity.Post;
import enumeration.AccountStatus;
import enumeration.AccountType;
import error.NoResultException;
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
    private ForumSessionBeanLocal forumSessionBeanLocal;

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
            Person student2 = new Person("bobwong@u.nus.edu", "1234567aA@", "Bob Wong", "default", "default", AccountType.STUDENT, AccountStatus.ACTIVE, "Science", "Biomedical Engineering", "3", new Date());
            Person staff1 = new Person("profben@comp.nus.edu.sg", "1234567aA@", "Prof. Ben", "default", "default", AccountType.STAFF, AccountStatus.ACTIVE, "Computing", "default", "default", new Date());
            Person staff2 = new Person("sam@nus.edu.sg", "1234567aA@", "Sam Lim", "default", "default", AccountType.STAFF, AccountStatus.UNAPPROVED, "Business", "default", "default", new Date());
            personSessionBeanLocal.createUser(student1);
            personSessionBeanLocal.createUser(student2);
            personSessionBeanLocal.createUser(staff1);
            personSessionBeanLocal.createUser(staff2);

            Guide guide1 = new Guide("Basketball", "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu dui, ornare eget porta sed, tincidunt tempor velit. Morbi quis aliquet felis, eget malesuada ipsum. Nulla luctus dignissim eros ut iaculis. Sed sit amet aliquet erat. Sed laoreet semper massa, sit amet porta mi tristique nec. Aliquam viverra justo in ipsum placerat consectetur. Fusce varius lacus vitae tincidunt eleifend.</p> <p>Sed efficitur turpis eget vulputate hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed mi non lacus finibus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dolor risus, venenatis non tristique eget, placerat in nisi. Maecenas condimentum vulputate arcu a hendrerit. Quisque sit amet augue nulla. Nullam maximus, nulla eu feugiat auctor, quam lorem volutpat metus, non suscipit magna enim nec mauris. In bibendum massa non nisl elementum interdum. Duis pellentesque erat felis, et sagittis metus imperdiet eu. Nulla vitae velit ac tortor gravida porttitor et convallis odio. Proin elit sapien, ornare id commodo a, sagittis at velit. Phasellus placerat lacus sed lectus feugiat tristique in sed nibh.&nbsp;</p>", "https://nustart.s3.amazonaws.com/basketball.jpeg", new Date(), staff2);
            Category cat1 = new Category("CCA", new Date(), a);
            List<Guide> c1 = cat1.getGuides();
            c1.add(guide1);
            cat1.setGuides(c1);
            personSessionBeanLocal.addCategories(cat1);

            Category cat2 = new Category("SG Attractions", new Date(), a);
            personSessionBeanLocal.addCategories(cat2);

//            Post p1 = new Post();
//            p1.setContent("this is the link to NUSMods: https://nusmods.com/timetable/sem-1");
//            p1.setCreator(student2);
//            p1.setCreatedAt(new Date());
//
//            Post p2 = new Post();
//            p2.setContent("You can plan your timetable on NUSMods");
//            p2.setCreator(student1);
//            p1.setCreatedAt(new Date());
//
//            Post p3 = new Post();
//            p3.setContent("Eat everywhere");
//            p3.setCreator(staff1);
//            p1.setCreatedAt(new Date());

            Thread t1 = new Thread();
            t1.setTitle("NUSMods Enquiries");
            t1.setCreator(student1);
            t1.setCreated(new Date());
//            List<Post> thread1 = t1.getPosts();
//            thread1.add(p2);
//            thread1.add(p1);
//            t1.setPosts(thread1);
            
            Thread t2 = new Thread();
            t2.setTitle("ModReg Enquiries");
            t2.setCreator(student2);
            t2.setCreated(new Date());
//            List<Post> thread2 = t2.getPosts();
//            thread2.add(p3);
//            thread2.add(p1);
//            t2.setPosts(thread2);

            Thread t3 = new Thread();
            t3.setTitle("How do I get to Techno Edge?");
            t3.setCreator(student1);
            t3.setCreated(new Date());

            Forum f = new Forum();
            f.setTitle("Module Selection");
            f.setDescription("How to get started? We'll tell you more about NUSMods, Modreg and many more...");
            f.setCreator(a);
            f.setCreated(new Date());
            List<Thread> forum = f.getThreads();
            forum.add(t1);
            forum.add(t2);
            f.setThreads(forum);
            forumSessionBeanLocal.createForum(f);

            Forum f2 = new Forum();
            f2.setTitle("Navigation in NUS");
            f2.setDescription("What's the fastest routes going from places to places in NUS? Share your shortcuts and tips!");
            f2.setCreator(a);
            f2.setCreated(new Date());
            List<Thread> forum2 = f2.getThreads();
            forum2.add(t3);
            f2.setThreads(forum2);
            forumSessionBeanLocal.createForum(f2);

            Forum f3 = new Forum();
            f3.setTitle("COVID-19 restrictions and procedures at NUS");
            f3.setDescription("So, what's the east coast plan now?");
            f3.setCreator(a);
            f3.setCreated(new Date());
            forumSessionBeanLocal.createForum(f3);

            Forum f5 = new Forum();
            f5.setTitle("NUS SEP Procedures and its COVID-19 contraints");
            f5.setDescription("More information about NUS SEP and updates on SEP COVID-19 arrangements. Share your experience here!");
            f5.setCreator(a);
            f5.setCreated(new Date());
            forumSessionBeanLocal.createForum(f5);

            Map m1 = new Map();
            m1.setTitle("Campus");
            m1.setUrl("https://nustart.s3.amazonaws.com/campus.png");
            personSessionBeanLocal.addMap(m1);

            Map m2 = new Map();
            m2.setTitle("UTown");
            m2.setUrl("https://nustart.s3.amazonaws.com/OHS_UTOWN-MAP_large.png");
            personSessionBeanLocal.addMap(m2);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
