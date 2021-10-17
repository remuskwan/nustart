/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import javax.ejb.EJB;
import javax.ws.rs.Path;
import session.AdminSessionBeanLocal;


/**
 *
 * @author Allie
 */
@Path("admin")
public class AdminResource {
    @EJB
    private AdminSessionBeanLocal adminSessionBeanLocal;
    
    
}
