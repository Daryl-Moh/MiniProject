package com.tfip2223miniproject.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfip2223miniproject.server.exceptions.DuplicateEmailException;
import com.tfip2223miniproject.server.models.Role;
import com.tfip2223miniproject.server.models.User;
import com.tfip2223miniproject.server.repositories.UserRepository;

import jakarta.json.JsonObject;

@Service
public class AuthService {
    
    @Autowired
        private UserRepository userRepo;
        @Autowired
        private JwtService jwtSvc;
        @Autowired
        private PasswordEncoder pwEncoder;
        @Autowired
        private AuthenticationManager authManager;

        // public JsonObject register(JsonObject request) throws DuplicateEmailException {
        //         User newUser = User.builder()
        //                         .givenname(request.getString("givenname"))
        //                         .familyname(request.getString("familyname"))
        //                         .email(request.getString("email"))
        //                         .password(pwEncoder.encode(request.getString("password")))
        //                         .role(Role.USER)
        //                         .isGoogleLogin(request.getBoolean("isGoogleLogin"))
        //                         .build();
        //         System.out.println("newUser created");
        //         userRepo.insertUser(newUser);
        //         // give new user JWT
        //         return jwtSvc.generateJWT(newUser);
        // }

        public JsonObject register(JsonObject request) throws DuplicateEmailException {
                User newUser = User.builder()
                                .givenname(request.getString("givenname"))
                                .familyname(request.getString("familyname"))
                                .email(request.getString("email"))
                                .password(pwEncoder.encode(request.getString("password")))
                                .role(Role.USER)
                                .build();
                System.out.println("newUser created");
                userRepo.insertUser(newUser);
                // give new user JWT
                return jwtSvc.generateJWT(newUser);
        }

        public JsonObject login(JsonObject request) {
                authManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getString("email"),
                                                request.getString("password")));
                // authenticated
                User user = userRepo.getUserByEmail(request.getString("email"))
                                .orElseThrow();
                System.out.println("User Login Detected");
                return jwtSvc.generateJWT(user);

        }

}
