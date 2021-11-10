/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Person;
import enumeration.AccountStatus;
import enumeration.AccountType;
import error.NoResultException;
import java.util.Date;
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
            Person a = new Person();
            a.setAccountType(AccountType.ADMIN);
            a.setAccountStatus(AccountStatus.ACTIVE);
            a.setEmail("admin01@mail.com");
            a.setPassword("1234567aA@");
            a.setCreated(new Date());
            a.setUsername("Admin01");
            a.setFaculty("default");
            a.setCourse("default");
            a.setYr("0");
            a.setProfilePicture("default");
            a.setCoverImage("default");
            personSessionBeanLocal.createUser(a);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
