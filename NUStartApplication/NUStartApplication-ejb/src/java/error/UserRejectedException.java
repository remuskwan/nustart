package error;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author remuskwan
 */
public class UserRejectedException extends Exception {

    /**
     * Creates a new instance of <code>UserRejectedException</code> without
     * detail message.
     */
    public UserRejectedException() {
    }

    /**
     * Constructs an instance of <code>UserRejectedException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public UserRejectedException(String msg) {
        super(msg);
    }
}
