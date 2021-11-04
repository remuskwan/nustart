/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Person;
import error.InvalidLoginException;
import error.NoResultException;
import error.UserBlockedException;
import error.UserEmailExistException;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PersonSessionBeanLocal;
import session.UnknownPersistenceException;

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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUser(Person p) {
        try {
            p.setCreated(new Date());
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
        } catch (UnknownPersistenceException ex) {
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
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "User not found").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }
}
