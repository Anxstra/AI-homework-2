package com.example.placeholder;

import com.example.placeholder.controller.UserController;
import com.example.placeholder.model.Address;
import com.example.placeholder.model.Company;
import com.example.placeholder.model.Geo;
import com.example.placeholder.model.User;
import com.example.placeholder.service.CustomUserDetailsService;
import com.example.placeholder.service.UserService;
import com.example.placeholder.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private AuthenticationManager authenticationManager;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setName("Test User");
        user.setUsername("testuser");
        user.setEmail("test@test.com");
        user.setPassword("password");

        Address address = new Address();
        address.setStreet("Test Street");
        address.setSuite("Test Suite");
        address.setCity("Test City");
        address.setZipcode("12345");
        Geo geo = new Geo();
        geo.setLat("1.0");
        geo.setLng("1.0");
        address.setGeo(geo);
        user.setAddress(address);

        Company company = new Company();
        company.setName("Test Company");
        company.setCatchPhrase("Test Catchphrase");
        company.setBs("Test BS");
        user.setCompany(company);
    }

    @Test
    @WithMockUser
    public void testGetAllUsers() throws Exception {
        User user1 = new User();
        user1.setId(1L);
        user1.setName("Test User 1");

        User user2 = new User();
        user2.setId(2L);
        user2.setName("Test User 2");

        List<User> users = Arrays.asList(user1, user2);

        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testGetUserById() throws Exception {
        when(userService.getUserById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test User"));
    }

    @Test
    @WithMockUser
    void testCreateUser() throws Exception {
        when(userService.createUser(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/users")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test User\",\"username\":\"testuser\",\"email\":\"test@test.com\",\"password\":\"password\"}"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testUpdateUser() throws Exception {
        when(userService.updateUser(eq(1L), any(User.class))).thenReturn(user);

        mockMvc.perform(put("/users/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Updated User\",\"username\":\"testuser\",\"email\":\"test@test.com\",\"password\":\"password\"}"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/users/1")
                        .with(csrf()))
                .andExpect(status().isOk());
    }
} 