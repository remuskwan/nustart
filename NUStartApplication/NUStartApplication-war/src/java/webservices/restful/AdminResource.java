/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import error.NoResultException;
import java.util.List;
import entity.Category;
import entity.Facility;
import entity.Map;
import entity.Person;
import java.util.Date;
import error.InvalidLoginException;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.PersonSessionBeanLocal;

/**
 *
 * @author Allie
 */
@Path("admin")
public class AdminResource {
    @EJB
    private PersonSessionBeanLocal personSessionBeanLocal; 
    
    //plain text input?
    @Path("adminLogin")
    @GET
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminLogin(@QueryParam("email") String email, @QueryParam("password") String password){
        try
        {
            Person person = personSessionBeanLocal.administratorLogin(email, password);
            person.setPassword(null);

            return Response.status(Response.Status.OK).entity(new Person(email,password)).build();
        }
        catch(InvalidLoginException | NoResultException ex)
        {    
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ex.getMessage()).build();
        }
    }

    @GET
    @Path("/staffs")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllStaff() {
        
        return personSessionBeanLocal.getAllStaff();
    }

    @GET
    @Path("/students")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllStudents() {
        return personSessionBeanLocal.getAllStudents();
    }

    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return personSessionBeanLocal.getCategories();
    }

    @POST
    @Path("/categories")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Category createCategory(Category c) {
        c.setCreated(new Date());
        personSessionBeanLocal.addCategories(c);
        return c;
    }

    @PUT
    @Path("/categories/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editCategory(@PathParam("id") Long cId, Category c) {
        try {
            personSessionBeanLocal.updateCategory(c);
            return Response.status(204).build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", " Category not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/categories/{cid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCategory(@PathParam("cid") String cId) {
        try {
            personSessionBeanLocal.deleteCategory(cId);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Category not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @POST
    @Path("/maps")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map createMap(Map map) {
        personSessionBeanLocal.addMap(map);
        return map;
    }
    
    
    @PUT
    @Path("/maps/{mId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editMap(@PathParam("id") Long mId, Map map) {

        try {
            personSessionBeanLocal.updateMap(map);
            return Response.status(204).build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Map not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/maps/{mapId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteMap(@PathParam("mapId") Long id) {
        try {
            personSessionBeanLocal.deleteMap(id);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Category not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }   
    
    
    @POST
    @Path("/facilities")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Facility createFacility(Facility f) {
        personSessionBeanLocal.addFacility(f);
        return f;
    }

    @PUT
    @Path("/facilities/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editFacility(@PathParam("id") Long fId, Facility f) {

        try {
            personSessionBeanLocal.updateFacility(f);
            return Response.status(204).build();
        } catch (Exception e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/facilities/{fid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFacility(@PathParam("fid") Long fId) {
        personSessionBeanLocal.deleteFacility(fId);
        return Response.status(204).build();
    }

    @PUT
    @Path("/students/block/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response blockStudent(@PathParam("studentId") Long sId) {
        try {
            personSessionBeanLocal.blockUser(sId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/students/unblock/{sid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response unblockStudent(@PathParam("sid") Long sId) {
        try {
            personSessionBeanLocal.unblockUser(sId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/staffs/block/{staffId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response blockStaff(@PathParam("staffId") Long sId) {
        try {
            personSessionBeanLocal.blockUser(sId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/staffs/unblock/{sid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response unblockStaff(@PathParam("sid") Long sId) {
        try {
            personSessionBeanLocal.unblockUser(sId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    
}
