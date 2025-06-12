package com.example.placeholder.model;

import jakarta.persistence.Embedded;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Address {
    private String street;
    private String suite;
    private String city;
    private String zipcode;
    @Embedded
    private Geo geo;
} 