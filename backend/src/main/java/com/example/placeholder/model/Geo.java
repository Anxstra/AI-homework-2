package com.example.placeholder.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Geo {
    private String lat;
    private String lng;
} 