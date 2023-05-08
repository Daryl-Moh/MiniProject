package com.tfip2223miniproject.server.exceptions;

public class DuplicateEmailException extends RuntimeException{
    public DuplicateEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
