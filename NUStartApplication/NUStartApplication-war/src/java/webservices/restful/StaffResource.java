package webservices.restful;

import entity.Person;
import error.NoResultException;
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
import session.PersonSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author dengxueqi
 */
@Path("staff")
public class StaffResource {

    @EJB
    private PersonSessionBeanLocal personSessionBeanLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllStaff() {
        return personSessionBeanLocal.getAllStaff();
    }

    @GET
    @Path("/{staffId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStaff(@PathParam("staffId") Long staffId) {
        try {
            Person p = personSessionBeanLocal.getPerson(staffId);
            return Response.status(200).entity(p).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Person createStaff(Person s) {
        personSessionBeanLocal.createStaff(s);
        return s;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateStaff(@PathParam("id") Long staffId, Person s) {
        s.setId(staffId);
        try {
            personSessionBeanLocal.updateStaff(s);
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
    @Path("/{staffId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteStaff(@PathParam("staffId") Long staffId) {
        try {
            personSessionBeanLocal.deletePerson(staffId);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Guide not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

}
