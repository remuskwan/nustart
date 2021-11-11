//package webservices.restful;
//
//import entity.Person;
//import error.NoResultException;
//import java.util.List;
//import javax.ejb.EJB;
//import javax.json.Json;
//import javax.json.JsonObject;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.DELETE;
//import javax.ws.rs.GET;
//import javax.ws.rs.POST;
//import javax.ws.rs.PUT;
//import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.Produces;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import session.PersonSessionBeanLocal;
///**
// * REST Web Service
// *
// * @author dengxueqi
// */
//@Path("students")
//public class StudentsResource {
//    
//    @EJB
//    PersonSessionBeanLocal personSessionBeanLocal;
//
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<Person> getAllStudents() {
//        return personSessionBeanLocal.getAllStudents();
//    }
//
//    @GET
//    @Path("/{id}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getStudent(@PathParam("id") Long sId) {
//        try {
//            Person p = personSessionBeanLocal.getPerson(sId);
//            return Response.status(200)
//                    .entity(p)
//                    .type(MediaType.APPLICATION_JSON)
//                    .build();
//        } catch (NoResultException ex) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Not found").build();
//            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON)
//                    .build();
//        }
//    }
//
//    @POST
//    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_JSON)
//    public Person createStudent(Person s) {
//        personSessionBeanLocal.createStudent(s);
//        return s;
//    }
//
//    @DELETE
//    @Path("/{studentId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response deleteStudent(@PathParam("id") Long studentId) {
//        try {
//            personSessionBeanLocal.deletePerson(studentId);
//            return Response.status(204).build();
//        } catch (NoResultException ex) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Not found").build();
//            return Response.status(404).entity(exception)
//                    .build();
//        }
//    }
//
//    @PUT
//    @Path("/{id}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response updateStudent(@PathParam("id") Long sId, Person s) {
//        s.setId(sId);
//        try {
//            personSessionBeanLocal.updateStudent(s);
//            return Response.status(204).build();
//        } catch (NoResultException e) {
//            JsonObject exception = Json.createObjectBuilder().add("error", "Not found")
//                    .build();
//            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
//        }
//    }
//
//}
