package com.sistema.biblioteca.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.request.LoginRequest;
import com.sistema.biblioteca.dto.response.LoginResponse;
import com.sistema.biblioteca.entity.Usuario;
import com.sistema.biblioteca.repository.UsuarioRepository;
import com.sistema.biblioteca.security.JwtService;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        boolean passwordCorrecta = passwordEncoder.matches(request.getPassword(), usuario.getPassword());

        if (!passwordCorrecta) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(usuario);

        return new LoginResponse(
                usuario.getId(),
                usuario.getUserName(),
                usuario.getTipo().name(),
                token,
                "Login exitoso"
        );
    }
}