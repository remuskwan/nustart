/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Guide;
import entity.Staff;
import entity.Student;
import error.NoResultException;
import java.util.List;
import entity.Category;
import entity.Facility;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.AdminSessionBeanLocal;
import session.StaffSessionBeanLocal;
import session.StudentSessionBeanLocal;

/**
 *
 * @author Allie
 */
@Path("admin")
public class AdminResource {

    @EJB
    private AdminSessionBeanLocal adminSessionBeanLocal;
    @EJB
    private StaffSessionBeanLocal staffSessionBeanLocal;
    @EJB
    private StudentSessionBeanLocal studentSessionBeanLocal;

    @GET
    @Path("/staffs")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Staff> getAllStaff() {
        return adminSessionBeanLocal.getAllStaff();
    }

    @GET
    @Path("/students")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Student> getAllStudent() {
        return adminSessionBeanLocal.getAllStudents();
    }

    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return adminSessionBeanLocal.getCategories();
    }

    @POST
    @Path("/categories")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Category createCategory(Category c) {
        adminSessionBeanLocal.addCategories(c);
        return c;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editCategory(@PathParam("id") Long cId, Category c) {

        try {
            adminSessionBeanLocal.updateCat(c);
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
    @Path("/{cid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCategory(@PathParam("cid") String name) {
        try {
            adminSessionBeanLocal.deleteCategory(name);
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
        adminSessionBeanLocal.addFacility(f);
        return f;
    }

    @PUT
    @Path("/facilities/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editFacility(@PathParam("id") Long fId, Facility f) {

        try {
            adminSessionBeanLocal.updateFacility(f);
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
        adminSessionBeanLocal.deleteFacility(fId);
        return Response.status(204).build();
    }
}
