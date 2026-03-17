package com.sistema.biblioteca.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.response.ReporteAutorResponse;
import com.sistema.biblioteca.dto.response.ReporteLibroItem;
import com.sistema.biblioteca.entity.Autor;
import com.sistema.biblioteca.entity.Libro;
import com.sistema.biblioteca.repository.AutorRepository;
import com.sistema.biblioteca.repository.LibroRepository;

@Service
public class ReporteService {

    private final AutorRepository autorRepository;
    private final LibroRepository libroRepository;

    public ReporteService(AutorRepository autorRepository, LibroRepository libroRepository) {
        this.autorRepository = autorRepository;
        this.libroRepository = libroRepository;
    }

    public ReporteAutorResponse obtenerReportePorCedula(String cedula) {
        Autor autor = autorRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con cédula: " + cedula));

        List<Libro> librosAutor = libroRepository.findByAutorCedula(cedula);

        List<ReporteLibroItem> libros = librosAutor.stream()
                .map(libro -> new ReporteLibroItem(
                        libro.getIsbn(),
                        libro.getTitulo(),
                        libro.getEditorial(),
                        libro.getGenero(),
                        libro.getAnioPublicacion()
                ))
                .toList();

        return new ReporteAutorResponse(
                autor.getCedula(),
                autor.getNombreCompleto(),
                autor.getNacionalidad(),
                libros
        );
    }
}