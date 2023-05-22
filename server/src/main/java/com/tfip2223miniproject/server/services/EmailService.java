package com.tfip2223miniproject.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Value("${spring.mail.username}")
    private String companyEmail;

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String userEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(companyEmail);
        message.setTo(companyEmail);
        message.setSubject("Request for contact");
        message.setText("Hi, \n\nI am interested to engage your company services. \n\nPlease contact me at: " + userEmail);
        mailSender.send(message);
        System.out.println("Email inquiry from " + userEmail + " sent to: " + companyEmail);
    }
    
}
