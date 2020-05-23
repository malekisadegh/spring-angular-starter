package ir.sadad.los.exception;

import org.springframework.security.core.AuthenticationException;

import static ir.bmi.identity.security.exception.BmiClientSecurityExceptionMessages.SECURITY_TOKEN_IS_NOT_PROVIDED_OR_NOT_VALID;

public class NoTokenOrInvalidTokenProvidedException extends AuthenticationException {

    public NoTokenOrInvalidTokenProvidedException(String msg, Throwable t) {
        super(msg, t);
    }

    public NoTokenOrInvalidTokenProvidedException() {
        this(SECURITY_TOKEN_IS_NOT_PROVIDED_OR_NOT_VALID, null);
    }

}
