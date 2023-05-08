package com.tfip2223miniproject.server.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.tfip2223miniproject.server.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.json.Json;
import jakarta.json.JsonObject;


@Service
public class JwtService {

    // Set the expiry duration to 1 hours
    private static final Long expDuration = 1000l * 60 * 60 * 1;

    @Value("${sha256.secret}")
    private String sha256Secret;

    public JsonObject generateJWT(User user) {
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuer("ISMS")
                .setSubject(user.getEmail())
                .claim("givenname", user.getGivenname())
                .claim("familyname", user.getFamilyname())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expDuration))
                .signWith(Keys.hmacShaKeyFor(sha256Secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
        JsonObject jwtObject = Json.createObjectBuilder()
            .add("jwt", jwt)
            .build();
        return jwtObject;
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(sha256Secret.getBytes());
    }

    // generate only with userdetails
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean isTokenExpired(String token) {
        // return extractExpiration(token).before(new Date());
        return false;
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername())) &&
                !isTokenExpired(token);
    }

}
