package com.sistema.biblioteca.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.request.AutorRequest;
import com.sistema.biblioteca.entity.Autor;
import com.sistema.biblioteca.repository.AutorRepository;

@Service
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    public List<Autor> listarTodos() {
        return autorRepository.findAll();
    }

    public Autor buscarPorCedula(String cedula) {
        return autorRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con cédula: " + cedula));
    }

    public Autor crear(AutorRequest request) {
        if (autorRepository.existsById(request.getCedula())) {
            throw new RuntimeException("Ya existe un autor con esa cédula");
        }

        Autor autor = new Autor();
        autor.setCedula(request.getCedula());
        autor.setNombreCompleto(request.getNombreCompleto());
        autor.setNacionalidad(request.getNacionalidad());

        return autorRepository.save(autor);
    }

    public Autor actualizar(String cedula, AutorRequest request) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con cédula: " + cedula));

        autor.setNombreCompleto(request.getNombreCompleto());
        autor.setNacionalidad(request.getNacionalidad());

        return autorRepository.save(autor);
    }

    public void eliminar(String cedula) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con cédula: " + cedula));

        autorRepository.delete(autor);
    }
}