package com.sistema.biblioteca.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistema.biblioteca.dto.request.LibroRequest;
import com.sistema.biblioteca.entity.Autor;
import com.sistema.biblioteca.entity.Libro;
import com.sistema.biblioteca.repository.AutorRepository;
import com.sistema.biblioteca.repository.LibroRepository;

@Service
public class LibroService {

    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;

    public LibroService(LibroRepository libroRepository, AutorRepository autorRepository) {
        this.libroRepository = libroRepository;
        this.autorRepository = autorRepository;
    }

    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    public Libro buscarPorIsbn(String isbn) {
        return libroRepository.findById(isbn)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con ISBN: " + isbn));
    }

    public List<Libro> listarPorAutorCedula(String cedula) {
        return libroRepository.findByAutorCedula(cedula);
    }

    public Libro crear(LibroRequest request) {
        if (libroRepository.existsById(request.getIsbn())) {
            throw new RuntimeException("Ya existe un libro con ese ISBN");
        }

        Autor autor = autorRepository.findById(request.getAutorCedula())
                .orElseThrow(() -> new RuntimeException("No existe un autor con la cédula: " + request.getAutorCedula()));

        Libro libro = new Libro();
        libro.setIsbn(request.getIsbn());
        libro.setTitulo(request.getTitulo());
        libro.setEditorial(request.getEditorial());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setAutor(autor);

        return libroRepository.save(libro);
    }

    public Libro actualizar(String isbn, LibroRequest request) {
        Libro libro = libroRepository.findById(isbn)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con ISBN: " + isbn));

        Autor autor = autorRepository.findById(request.getAutorCedula())
                .orElseThrow(() -> new RuntimeException("No existe un autor con la cédula: " + request.getAutorCedula()));

        libro.setTitulo(request.getTitulo());
        libro.setEditorial(request.getEditorial());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setAutor(autor);

        return libroRepository.save(libro);
    }

    public void eliminar(String isbn) {
        Libro libro = libroRepository.findById(isbn)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con ISBN: " + isbn));

        libroRepository.delete(libro);
    }
}