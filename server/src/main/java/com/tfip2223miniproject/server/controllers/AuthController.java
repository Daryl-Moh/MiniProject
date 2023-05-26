package com.tfip2223miniproject.server.controllers;

import org.glassfish.json.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfip2223miniproject.server.exceptions.DuplicateEmailException;
import com.tfip2223miniproject.server.services.AuthService;

import jakarta.json.JsonObject;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {

    @Autowired
    private AuthService authSvc;

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody String request) {

        JsonObject jsonRequest = JsonUtil.toJson(request)
                .asJsonObject();
        JsonObject jwt;
        try {
            jwt = authSvc.register(jsonRequest);
        } catch (DuplicateEmailException e) {
            System.err.println(e);
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("User already registered, please log in");
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jwt.toString());
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody String request) {
        JsonObject jsonRequest = JsonUtil.toJson(request).asJsonObject();
        JsonObject jwt;
        jwt = authSvc.login(jsonRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jwt.toString());
    }
}
