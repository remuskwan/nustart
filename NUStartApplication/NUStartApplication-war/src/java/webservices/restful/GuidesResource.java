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
    private GuideSessionBeanLocal guideSessionBeanLocal;

    public GuidesResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Guide> getAllGuides() {
        return guideSessionBeanLocal.searchGuides();
    }

    @GET
    @Path("/{gid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGuide(@PathParam("gid") Long gid) {
        try {
            Guide c = guideSessionBeanLocal.getGuide(gid);
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
    @Path("/{gid}/category")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCategoryFromGuide(@PathParam("gid") Long gid) {
        try {
            Category c = guideSessionBeanLocal.getCategoryFromGuide(gid);
            return Response.status(200).entity(c).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("/{id}/comments")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addComment(@PathParam("id") Long gId, Comment c) {
        try {
            c.setCreated(new Date());
            guideSessionBeanLocal.addComment(gId, c);
            Guide g = guideSessionBeanLocal.getGuide(gId);
            
            return Response.status(200).entity(g).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Forum not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/{id}/comments")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editComment(@PathParam("id") Long gId, Comment c) {
        try {
            guideSessionBeanLocal.editComment(c);
            Guide g = guideSessionBeanLocal.getGuide(gId);
            return Response.status(200).entity(g).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @DELETE
    @Path("/{gId}/comments/{cId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteComment(@PathParam("gId") Long gId, @PathParam("cId") Long cId) {
        try {
            guideSessionBeanLocal.deleteComment(gId, cId);
            Guide g = guideSessionBeanLocal.getGuide(gId);
            return Response.status(200).entity(g).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("/{gid}/comments")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getComments(@PathParam("gid") Long gid) {
        try {
            List<Comment> comments = guideSessionBeanLocal.getComments(gid);
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
    @Path("/{gId}/comments/{cid}/replies")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentReplies(@PathParam("gId") Long gId, @PathParam("cid") Long cid) {
        try {
            List<Comment> comments = guideSessionBeanLocal.getCommentReplies(cid);
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
    
//    @POST
//    @Path("/{id}/links")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response addLink(@PathParam("id") Long gId, Link c) {
//        try {
//            guideSessionBeanLocal.addLink(gId, c);
//            Guide g = guideSessionBeanLocal.getGuide(gId);
//            
//            return Response.status(200).entity(g).build();
//        } catch (NoResultException ex) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Forum not found")
//                    .build();
//
//            return Response.status(404).entity(exception).build();
//        }
//    }
//    
//    @PUT
//    @Path("/{id}/links")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response editLink(@PathParam("id") Long gId, Link c) {
//        try {
//            guideSessionBeanLocal.editLink(c);
//            Guide g = guideSessionBeanLocal.getGuide(gId);
//            return Response.status(200).entity(g).build();
//        } catch (NoResultException e) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Not found")
//                    .build();
//            return Response.status(404).entity(exception)
//                    .type(MediaType.APPLICATION_JSON).build();
//        }
//    }
//
//    @DELETE
//    @Path("/{gId}/links/{lId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response deleteLink(@PathParam("gId") Long gId, @PathParam("lId") Long lId) {
//        try {
//            guideSessionBeanLocal.deleteComment(gId, lId);
//            Guide g = guideSessionBeanLocal.getGuide(gId);
//            return Response.status(200).entity(g).build();
//        } catch (NoResultException e) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Not found")
//                    .build();
//            return Response.status(404).entity(exception).build();
//        }
//    }

    @GET
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchGuides(@QueryParam("title") String title,
            @QueryParam("creator") String email) {
        if (title != null) {
            List<Guide> results
                    = guideSessionBeanLocal.searchGuidesByTitle(title);
            GenericEntity<List<Guide>> entity = new GenericEntity<List<Guide>>(results) {
            };
            return Response.status(200).entity(
                    entity
            ).build();
        } else if (email != null) {
            try {
                List<Guide> results
                        = guideSessionBeanLocal.searchGuidesByCreator(email);
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

    //TODO: get comment replies (additional feature)
}
