package entity;

import enumeration.AccountStatus;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import enumeration.AccountType;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author dengxueqi
 */
@Entity
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique=true)
    private String email;
    private String password;
    private String username;
    private String profilePicture; 
    private String coverImage;
    @Enumerated
    private AccountType accountType;
    @Enumerated
    private AccountStatus accountStatus;
    private String faculty; //student and staff only
    private String course; // student only
    private String yr; //student only
    @Temporal(TemporalType.DATE)
    private Date created;

    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Contact> contacts;

    public Person() {
        this.contacts = new ArrayList<>();
    }

    public Person(String email, String password, String username, String profilePicture, String coverImage, AccountType accountType, AccountStatus accountStatus, String faculty, String course, String yr, Date created) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.profilePicture = profilePicture;
        this.coverImage = coverImage;
        this.accountType = accountType;
        this.accountStatus = accountStatus;
        this.faculty = faculty;
        this.course = course;
        this.yr = yr;
        this.created = created;
        this.contacts = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getYr() {
        return yr;
    }

    public void setYr(String yr) {
        this.yr = yr;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

//    public List<Integer> getLikedPosts() {
//        return likedPosts;
//    }
//
//    public void setLikedPosts(List<Integer> likedPosts) {
//        this.likedPosts = likedPosts;
//    }
//
//    public List<Integer> getLikedGuides() {
//        return likedGuides;
//    }
//
//    public void setLikedGuides(List<Integer> likedGuides) {
//        this.likedGuides = likedGuides;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Person)) {
            return false;
        }
        Person other = (Person) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Person[ id=" + id + " ]";
    }

}
