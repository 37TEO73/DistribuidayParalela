package com.sistema.biblioteca.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.response.EstadisticaAutorResponse;
import com.sistema.biblioteca.entity.Autor;
import com.sistema.biblioteca.repository.AutorRepository;
import com.sistema.biblioteca.repository.LibroRepository;

@Service
public class EstadisticaService {

    private final AutorRepository autorRepository;
    private final LibroRepository libroRepository;

    public EstadisticaService(AutorRepository autorRepository, LibroRepository libroRepository) {
        this.autorRepository = autorRepository;
        this.libroRepository = libroRepository;
    }

    public List<EstadisticaAutorResponse> obtenerLibrosPorAutor() {
        List<Autor> autores = autorRepository.findAll();

        return autores.stream()
                .map(autor -> new EstadisticaAutorResponse(
                        autor.getCedula(),
                        autor.getNombreCompleto(),
                        libroRepository.countByAutorCedula(autor.getCedula())
                ))
                .toList();
    }
}