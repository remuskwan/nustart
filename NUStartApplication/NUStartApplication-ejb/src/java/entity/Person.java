package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import enumeration.AccountType;

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
    private String email;
    private String password;
    private String profilePicture; 
    private AccountType accountType;
    private boolean active; //student and staff only
    private String faculty; //student and staff only
    private String course; // student only
    private int yr; //student only
    private boolean deleted;

//    @OneToMany(mappedBy = "creator")
//    private List<Forum> forums; //admin only
//    @OneToMany(mappedBy = "creator")
//    private List<Thread> threads;
//    @OneToMany(mappedBy = "creator")
//    private List<Guide> guides; //staff only
//    @OneToMany(mappedBy = "creator")
//    private List<Post> posts;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Contact> contacts;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Guide> favoriteGuides;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Post> favoritePosts;

    public Person() {
        
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

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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

    public int getYr() {
        return yr;
    }

    public void setYr(int yr) {
        this.yr = yr;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

//    public List<Forum> getForums() {
//        return forums;
//    }
//
//    public void setForums(List<Forum> forums) {
//        this.forums = forums;
//    }
//
//    public List<Thread> getThreads() {
//        return threads;
//    }
//
//    public void setThreads(List<Thread> threads) {
//        this.threads = threads;
//    }
//
//    public List<Guide> getGuides() {
//        return guides;
//    }
//
//    public void setGuides(List<Guide> guides) {
//        this.guides = guides;
//    }
//
//    public List<Post> getPosts() {
//        return posts;
//    }
//
//    public void setPosts(List<Post> posts) {
//        this.posts = posts;
//    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public List<Guide> getFavoriteGuides() {
        return favoriteGuides;
    }

    public void setFavoriteGuides(List<Guide> favoriteGuides) {
        this.favoriteGuides = favoriteGuides;
    }

    public List<Post> getFavoritePosts() {
        return favoritePosts;
    }

    public void setFavoritePosts(List<Post> favoritePosts) {
        this.favoritePosts = favoritePosts;
    }

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
