package com.sistema.biblioteca.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.request.UsuarioRequest;
import com.sistema.biblioteca.dto.response.UsuarioResponse;
import com.sistema.biblioteca.entity.Usuario;
import com.sistema.biblioteca.enums.TipoUsuario;
import com.sistema.biblioteca.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UsuarioResponse buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        return mapToResponse(usuario);
    }

    public UsuarioResponse crear(UsuarioRequest request) {
        if (usuarioRepository.findByUserName(request.getUserName()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con ese user_name");
        }

        TipoUsuario tipo = convertirTipo(request.getTipo());

        Usuario usuario = new Usuario();
        usuario.setUserName(request.getUserName());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setTipo(tipo);

        Usuario guardado = usuarioRepository.save(usuario);
        return mapToResponse(guardado);
    }

    public UsuarioResponse actualizar(Long id, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        usuarioRepository.findByUserName(request.getUserName())
                .filter(u -> !u.getId().equals(id))
                .ifPresent(u -> {
                    throw new RuntimeException("Ya existe un usuario con ese user_name");
                });

        TipoUsuario tipo = convertirTipo(request.getTipo());

        usuario.setUserName(request.getUserName());
        usuario.setTipo(tipo);

        Usuario actualizado = usuarioRepository.save(usuario);
        return mapToResponse(actualizado);
    }

    public void eliminar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        usuarioRepository.delete(usuario);
    }

    private TipoUsuario convertirTipo(String tipo) {
        try {
            return TipoUsuario.valueOf(tipo.toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Tipo de usuario inválido. Use ADMIN o EMPLEADO");
        }
    }

    private UsuarioResponse mapToResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getUserName(),
                usuario.getTipo().name()
        );
    }
}