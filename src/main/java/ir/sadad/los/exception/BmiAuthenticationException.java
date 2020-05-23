package ir.sadad.los.exception;

import org.springframework.security.core.AuthenticationException;

public class BmiAuthenticationException extends AuthenticationException {
    public BmiAuthenticationException(String msg, Throwable t) {
        super(msg, t);
    }

    public BmiAuthenticationException(String msg) {
        super(msg);
    }

}
