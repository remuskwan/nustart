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
public class UserBlockedException extends Exception {

    /**
     * Creates a new instance of <code>UserBlockedException</code> without
     * detail message.
     */
    public UserBlockedException() {
    }

    /**
     * Constructs an instance of <code>UserBlockedException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public UserBlockedException(String msg) {
        super(msg);
    }
}
