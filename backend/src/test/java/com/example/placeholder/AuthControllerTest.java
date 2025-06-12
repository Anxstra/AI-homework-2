package com.example.placeholder;

import com.example.placeholder.controller.AuthController;
import com.example.placeholder.dto.AuthRequest;
import com.example.placeholder.model.User;
import com.example.placeholder.service.CustomUserDetailsService;
import com.example.placeholder.service.UserService;
import com.example.placeholder.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class,
        excludeAutoConfiguration = {UserDetailsServiceAutoConfiguration.class})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    @WithMockUser
    public void testCreateAuthenticationToken() throws Exception {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("test@test.com");
        authRequest.setPassword("password");

        User user = new User();
        user.setEmail("test@test.com");
        user.setPassword("password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(userDetailsService.loadUserByUsername("test@test.com")).thenReturn(new org.springframework.security.core.userdetails.User("test@test.com", "password", new ArrayList<>()));
        when(userService.getUserByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken(user)).thenReturn("test-token");

        mockMvc.perform(post("/authenticate")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@test.com\",\"password\":\"password\"}"))
                .andExpect(status().isOk());
    }
} 