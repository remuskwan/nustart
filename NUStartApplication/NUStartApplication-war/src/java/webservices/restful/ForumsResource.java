/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Forum;
import entity.Post;
import entity.Thread;
import error.NoResultException;
import java.util.Date;
import java.util.List;
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
import session.ForumSessionBeanLocal;
import session.ThreadSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author remuskwan
 */
@Path("forums")
public class ForumsResource {
    
    @EJB
    private ForumSessionBeanLocal forumSessionBeanLocal;
    @EJB
    private ThreadSessionBeanLocal threadSessionBeanLocal;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Forum> getAllForums() {
        return forumSessionBeanLocal.searchForums(null);
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getForum(@PathParam("id") Long fId) {
        try {
            Forum f = forumSessionBeanLocal.getForum(fId);
            return Response.status(200)
                    .entity(f)
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
    public Forum createForum(Forum f) {
        f.setCreated(new Date());
        forumSessionBeanLocal.createForum(f);
        return f;
    }
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteForum(@PathParam("id") Long fId) {
        try {
            forumSessionBeanLocal.deleteForum(fId);
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
    public Response editForum(@PathParam("id") Long fId, Forum f) {
        f.setId(fId);
        try {
            forumSessionBeanLocal.updateForum(f);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("/{id}/threads")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addThread(@PathParam("id") Long fId, Thread t) {
        try {
            t.setCreated(new Date());
            t.getPosts().forEach(x -> x.setCreatedAt(new Date()));
            forumSessionBeanLocal.addThread(fId, t);
            Forum f = forumSessionBeanLocal.getForum(fId);

            return Response.status(200).entity(f).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Forum not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/{id}/threads")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editThread(@PathParam("id") Long fId, Thread t) {
        try {
            forumSessionBeanLocal.editThread(t);
            
            return Response.status(200).entity(t).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/{forum_id}/threads/{thread_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteThread(@PathParam("forum_id") Long fId, 
            @PathParam("thread_id") Long tId) {
        try {
            forumSessionBeanLocal.deleteThread(fId, tId);
            return Response.status(204).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @POST
    @Path("/{forum_id}/threads/{thread_id}/posts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addPost(@PathParam("forum_id") Long fId, 
            @PathParam("thread_id") Long tId, Post p) {
        try {
            p.setCreatedAt(new Date());
            threadSessionBeanLocal.addPost(tId, p);
            Thread thread = threadSessionBeanLocal.getThread(tId);
            
            return Response.status(200).entity(thread).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Thread not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/{forum_id}/threads/{thread_id}/posts")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editPost(@PathParam("forum_id") Long fId, 
            @PathParam("thread_id") Long tId, Post p) {
        try {
            threadSessionBeanLocal.editPost(p);
            Thread thread = threadSessionBeanLocal.getThread(tId);
            
            return Response.status(200).entity(thread).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/{forum_id}/threads/{thread_id}/posts/{post_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePost(@PathParam("forum_id") Long fId, 
            @PathParam("thread_id") Long tId, 
            @PathParam("post_id") Long pId) {
        try {
            threadSessionBeanLocal.deletePost(tId, pId);
            Thread t = threadSessionBeanLocal.getThread(tId);
            return Response.status(200).entity(t).build();
        } catch (NoResultException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
}
