/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author remuskwan
 */
public class UserUnapprovedException extends Exception {

    /**
     * Creates a new instance of <code>UserUnapprovedException</code> without
     * detail message.
     */
    public UserUnapprovedException() {
    }

    /**
     * Constructs an instance of <code>UserUnapprovedException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public UserUnapprovedException(String msg) {
        super(msg);
    }
}
