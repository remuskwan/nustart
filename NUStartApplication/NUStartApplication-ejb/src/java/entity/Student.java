/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author dengxueqi
 */

@Entity
public class Student extends Person implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String faculty;
    private String course;
    private int yr;
    
    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Guide> favoriteGuides;
    
//    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
//    private List<Forum> favoriteForums;
    
//    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
//    private List<Forum> forums;
    
    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Contact> contacts;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
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
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Student)) {
            return false;
        }
        Student other = (Student) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Student[ id=" + id + " ]";
    }
    
}
