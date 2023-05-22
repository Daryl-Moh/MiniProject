package com.tfip2223miniproject.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfip2223miniproject.server.services.EmailService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/email", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmailController {
    
    @Autowired
    private EmailService emailSvc;

    @PostMapping(path="/send")
    public ResponseEntity<String> sendEmail(
        @RequestParam String userEmail){
            emailSvc.sendEmail(userEmail);
            return ResponseEntity.ok("E-mail sent successfully!");
        }

}
