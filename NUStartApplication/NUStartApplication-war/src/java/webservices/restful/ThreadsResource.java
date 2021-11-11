/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Forum;
import entity.Thread;
import error.NoResultException;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.ThreadSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author remuskwan
 */
@Path("threads")
public class ThreadsResource {

    @EJB
    private ThreadSessionBeanLocal threadSessionBeanLocal;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getThread(@PathParam("id") Long tId) {
        try {
            Thread t = threadSessionBeanLocal.getThread(tId);
//            t.getCreator().setThreads(null);
            return Response.status(200)
                    .entity(t)
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
    @Path("/{id}/forum")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getForumFromThread(@PathParam("id") Long tId) {
        try {
            Forum f = threadSessionBeanLocal.getForumFromThread(tId);
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
}
