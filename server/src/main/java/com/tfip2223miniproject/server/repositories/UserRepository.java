package com.tfip2223miniproject.server.repositories;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.tfip2223miniproject.server.exceptions.DuplicateEmailException;
import com.tfip2223miniproject.server.models.User;

@Repository
public class UserRepository implements SQLQueries {
    
    @Autowired
    private JdbcTemplate template;

    public Integer insertUser(User user) throws DuplicateEmailException {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        try {
            template.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_INSERT_USER, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, user.getGivenname());
                ps.setString(2, user.getFamilyname());
                ps.setString(3, user.getEmail());
                ps.setString(4, user.getPassword());
                ps.setString(5, user.getRole().name());
                return ps;
            }, keyHolder);
        } catch (DataIntegrityViolationException e) {
            System.err.println(e);
            throw new DuplicateEmailException("User with email " + user.getEmail() + " already exists", e);
        }
        Number key = keyHolder.getKey();
        return (key == null) ? null : key.intValue();
    }

    public Optional<User> getUserByEmail(String email) {
        try {
            User user = template.queryForObject(SQL_GETUSERBYEMAIL, BeanPropertyRowMapper.newInstance(User.class),
                    email);
            return Optional.of(user);
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }
}
