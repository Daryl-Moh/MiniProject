package com.tfip2223miniproject.server.repositories;

public interface SQLQueries {

        public static final String SQL_INSERT_USER = """
                        INSERT INTO users(givenname, familyname, email, password, role) VALUES (?, ?, ?, ?, ?)
                        """;

        public static final String SQL_GETUSERBYEMAIL = """
                        SELECT * FROM users WHERE email = ?
                        """;

}
