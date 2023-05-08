package com.tfip2223miniproject.server.repositories;

public interface SQLQueries {
        // CREATE
        // public static final String SQL_INSERT_USER = """
        //                 INSERT INTO users(givenname, familyname, email, password, role, isGoogleLogin) VALUES (?, ?, ?, ?, ?, ?)
        //                 """;
        public static final String SQL_INSERT_USER = """
                        INSERT INTO users(givenname, familyname, email, password, role) VALUES (?, ?, ?, ?, ?)
                        """;

        // READ
        public static final String SQL_GETUSERBYEMAIL = """
                        SELECT * FROM users WHERE email = ?
                        """;

        // UPDATE

        // DELTE
}
