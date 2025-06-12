package com.example.placeholder.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Company {
    private String name;
    private String catchPhrase;
    private String bs;
} 