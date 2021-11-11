/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Contact;
import error.UserRejectedException;
import entity.Person;
import entity.Post;
import enumeration.AccountType;
import error.InvalidLoginException;
import error.NoResultException;
import error.UserBlockedException;
import error.UserEmailExistException;
import error.UserUnapprovedException;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PersonSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author remuskwan
 */
@Path("users")
public class UsersResource {

    @EJB
    PersonSessionBeanLocal personSessionBeanLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllUsers() {
        return personSessionBeanLocal.searchUsers(null);
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id") Long sId) {
        try {
            Person p = personSessionBeanLocal.getPerson(sId);
            System.out.println(p);
            return Response.status(200)
                    .entity(p)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    @GET
    @Path("/contactsId")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getContactId() {
        try {
            int latestId = personSessionBeanLocal.getContacts().size();
            System.out.println(latestId);
            return Response.status(200)
                    .entity(latestId)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    @GET
    @Path("/{id}/guides")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserGuides(@PathParam("id") Long id) {
        return Response.status(200)
                .entity(personSessionBeanLocal.getGuidesCreated(id))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    @GET
    @Path("/{id}/threads")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserThreads(@PathParam("id") Long id) {
        List<Thread> t = personSessionBeanLocal.getThreadsCreated(id);
        System.out.println(t);
        return Response.status(200)
                .entity(t)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    @GET
    @Path("/{id}/posts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserPosts(@PathParam("id") Long id) {
        List<Post> p = personSessionBeanLocal.getPostsCreated(id);
        System.out.println(p);
        return Response.status(200)
                .entity(p)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUser(Person p) {
        try {
            p.setCreated(new Date());
            p.setCoverImage("default");
            p.setProfilePicture("default");
            if (p.getAccountType() == AccountType.STAFF) {
                p.setCourse("default");
                p.setYr("default");
            }
            personSessionBeanLocal.createUser(p);
            return Response.status(200)
                    .entity(p.getId())
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (UserEmailExistException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Account already exists").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }
    
    @POST
    @Path("/{id}/contacts")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addContact(@PathParam("id") Long pId, Contact c) {
        try {
            List<Contact> contacts = personSessionBeanLocal.addContact(pId, c);
            return Response.status(200)
                    .entity(contacts)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") Long pId) {
        try {
            personSessionBeanLocal.deletePerson(pId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception)
                    .build();
        }
    }
    
    @DELETE
    @Path("/{id}/contact/{cid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteContact(@PathParam("id") Long pId, @PathParam("cid") Long contactId) {
        try {
            List<Contact> c = personSessionBeanLocal.deleteContact(pId, contactId);
             return Response.status(200)
                .entity(c)
                .type(MediaType.APPLICATION_JSON)
                .build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found").build();
            return Response.status(404).entity(exception)
                    .build();
        }
    }


    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") Long pId, Person p) {
        p.setId(pId);
        try {
            personSessionBeanLocal.updateUser(p);
            return Response.status(200).entity(p).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Person u) {
        try {
            Long uId = personSessionBeanLocal.login(u.getEmail(), u.getPassword());
            return Response.status(200)
                    .entity(uId)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (InvalidLoginException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Invalid email address or password").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (UserBlockedException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "User blocked").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (UserUnapprovedException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Please wait to be approved").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (UserRejectedException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "You have been rejected.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (Exception ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "User not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchUsers(@QueryParam("username") String username, @QueryParam("email") String email,
            @QueryParam("faculty") String faculty, @QueryParam("course") String course) {
        if (username != null) {
            List<Person> results = personSessionBeanLocal.searchUsers(username);
            GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else if (email != null) {
            List<Person> results = personSessionBeanLocal.searchByEmail(email);
            GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else if (faculty != null) {
            List<Person> results = personSessionBeanLocal.searchByFaculty(faculty);
            GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else if (course != null) {
            List<Person> results = personSessionBeanLocal.searchByFaculty(course);
            GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(results) {
            };
            return Response.status(200).entity(entity).build();
        } else {
            //if search for staff   // COME BACK TO THIS. maybe front end parse a number? 1? 0 for student, 1 for staff
            //filter using accountType 

            List<Person> results = personSessionBeanLocal.searchByStaff();
            //List<Person> stu = personSessionBeanLocal.searchByStudent();
            GenericEntity<List<Person>> entity = new GenericEntity<List<Person>>(results) {
            };
            return Response.status(200).entity(entity).build();

        }

    }

}
