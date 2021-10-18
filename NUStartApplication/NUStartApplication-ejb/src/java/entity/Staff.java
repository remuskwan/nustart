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
public class Staff extends Person implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Guide> guides;
    
//    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
//    private List<Forum> forums;
    
    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Contact> contacts;
    
    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Guide> favoriteGuides;
    
//    @OneToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
//    private List<Forum> favoriteForums;
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }
    
    public List<Guide> getGuides() {
        return guides;
    }

    public void setGuides(List<Guide> guides) {
        this.guides = guides;
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
        if (!(object instanceof Staff)) {
            return false;
        }
        Staff other = (Staff) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Staff[ id=" + id + " ]";
    }
    
}
