package com.nis.test.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Map<String, UserDetails> users = new HashMap<>();

    public UserDetailsServiceImpl() {
        users.put("admin", User.withUsername("admin")
                .password("{noop}testpass")
                .roles("ADMIN")
                .build());

        users.put("user", User.withUsername("user")
                .password("{noop}testpass")
                .roles("USER")
                .build());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!users.containsKey(username)) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return users.get(username);
    }
}
