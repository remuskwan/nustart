/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filter;

import entity.Category;
import entity.Guide;
import error.NoResultException;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.GuideSessionBeanLocal;
import session.PersonSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author remuskwan
 */
@Path("categories")
public class CategoriesResource {
    
    @EJB
    private GuideSessionBeanLocal guideSessionBeanLocal;
    @EJB
    private PersonSessionBeanLocal personSessionBeanLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return guideSessionBeanLocal.getCategories();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Category createCategory(Category c) {
        c.setCreated(new Date());
        personSessionBeanLocal.addCategories(c);
        return c;
    }

    @PUT
    @Path("/{id}")
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
    @Path("/{cid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCategory(@PathParam("cid") Long cId) {
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
    @Path("/{id}/guides")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createGuide(@PathParam("id") Long cId, Guide g) {
        try {
            g.setDateCreated(new Date());
            guideSessionBeanLocal.createGuide(cId, g);
            Category c = guideSessionBeanLocal.getCategory(cId);
            
            return Response.status(200).entity(c).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Forum not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/{id}/guides")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editGuide(@PathParam("id") Long cId, Guide g) {
        try {
            guideSessionBeanLocal.updateGuide(g);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{cId}/guides/{gId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGuide(@PathParam("cId") Long cId, @PathParam("gId") Long gId) {
        try {
            guideSessionBeanLocal.deleteGuide(cId, gId);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Guide not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
}
