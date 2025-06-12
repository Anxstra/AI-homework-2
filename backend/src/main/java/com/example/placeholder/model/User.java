package com.example.placeholder.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    @Column(unique = true)
    private String email;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "street", column = @Column(name = "street")),
            @AttributeOverride(name = "suite", column = @Column(name = "suite")),
            @AttributeOverride(name = "city", column = @Column(name = "city")),
            @AttributeOverride(name = "zipcode", column = @Column(name = "zipcode")),
            @AttributeOverride(name = "geo.lat", column = @Column(name = "lat")),
            @AttributeOverride(name = "geo.lng", column = @Column(name = "lng"))
    })
    private Address address;
    private String phone;
    private String website;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "company_name")),
            @AttributeOverride(name = "catchPhrase", column = @Column(name = "company_catch_phrase")),
            @AttributeOverride(name = "bs", column = @Column(name = "company_bs"))
    })
    private Company company;
    private String password;
} 