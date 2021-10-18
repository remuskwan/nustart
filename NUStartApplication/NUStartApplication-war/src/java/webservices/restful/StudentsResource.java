package webservices.restful;

import entity.Student;
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
import session.StudentSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author dengxueqi
 */
@Path("students")
public class StudentsResource {

    @EJB
    private StudentSessionBeanLocal studentSessionBeanLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Student> getAllStudents() {
        return studentSessionBeanLocal.searchStudents();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudent(@PathParam("id") Long sId) {
        try {
            Student s = studentSessionBeanLocal.getStudent(sId);
            return Response.status(200)
                    .entity(s)
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
    public Student createStudent(Student s) {
        studentSessionBeanLocal.createStudent(s);
        return s;
    }

    @DELETE
    @Path("/{studentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteStudent(@PathParam("id") Long studentId) {
        try {
            studentSessionBeanLocal.deleteStudent(studentId);
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
    public Response updateStudent(@PathParam("id") Long sId, Student s) {
        s.setId(sId);
        try {
            studentSessionBeanLocal.updateStudent(s);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

}
