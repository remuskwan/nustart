/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Category;
import entity.Comment;
import entity.Guide;
import error.NoResultException;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
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
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.GuideSessionBeanLocal;

/**
 *
 * @author 孔馨悦
 */
@Path("guides")
@RequestScoped
public class GuidesResource {

    @EJB
    private GuideSessionBeanLocal guideSessionLocal;

    public GuidesResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Guide> getAllGuides() {
        return guideSessionLocal.searchGuides();
    }
    
    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return guideSessionLocal.getCategories();
    }

    @GET
    @Path("/{gid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuide(@PathParam("gid") Long gid) {
        try {
            Guide c = guideSessionLocal.getGuide(gid);
            return Response.status(200).entity(c).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("/{gid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getComments(@PathParam("gid") Long gid) {
        try {
            List<Comment> comments = guideSessionLocal.getComments(gid);
            GenericEntity<List<Comment>> entity = new GenericEntity<List<Comment>>(comments) {
            };
            return Response.status(200).entity(entity).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Path("/{cid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentReplies(@PathParam("cid") Long cid) {
        try {
            List<Comment> comments = guideSessionLocal.getCommentReplies(cid);
            GenericEntity<List<Comment>> entity = new GenericEntity<List<Comment>>(comments) {
            };
            return Response.status(200).entity(entity).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchGuides(@QueryParam("title") String title,
            @QueryParam("creator") String email) {
        if (title != null) {
            List<Guide> results
                    = guideSessionLocal.searchGuidesByTitle(title);
            GenericEntity<List<Guide>> entity = new GenericEntity<List<Guide>>(results) {
            };
            return Response.status(200).entity(
                    entity
            ).build();
        } else if (email != null) {
            try {
                List<Guide> results
                        = guideSessionLocal.searchGuidesByCreator(email);
                GenericEntity<List<Guide>> entity = new GenericEntity<List<Guide>>(results) {
                };
                return Response.status(200).entity(
                        entity
                ).build();
            } catch (Exception e) {
                JsonObject exception = Json.createObjectBuilder()
                        .add("error", "Not found")
                        .build();
                return Response.status(404).entity(exception)
                        .type(MediaType.APPLICATION_JSON).build();
            }
        } else {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "No query conditions")
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Guide createGuide(Guide g) {
        g.setDateCreated(new Date());
        guideSessionLocal.createGuide(g);
        return g;
    }

    @PUT
    @Path("/{gid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editGuide(@PathParam("gid") Long gId, Guide g) {
        g.setId(gId);
        try {
            guideSessionLocal.updateGuide(g);
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
    @Path("/{gid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteGuide(@PathParam("gid") Long gId) {
        try {
            guideSessionLocal.deleteGuide(gId);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Guide not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    //TODO: get comment replies (additional feature)
}
