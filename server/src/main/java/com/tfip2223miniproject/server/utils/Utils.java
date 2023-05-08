package com.tfip2223miniproject.server.utils;

import java.util.List;

import com.tfip2223miniproject.server.models.User;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

public class Utils {
    
    public static JsonObjectBuilder userToJOB(User u) {
        JsonObjectBuilder job = Json.createObjectBuilder()
                .add("email", u.getEmail())
                .add("givenname", u.getGivenname())
                .add("familyname", u.getFamilyname());
        return job;
    }

    public static JsonArrayBuilder userListToJAB(List<User> userList) {
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (User u : userList) {
            jab.add(userToJOB(u));
        }
        return jab;
    }
}
