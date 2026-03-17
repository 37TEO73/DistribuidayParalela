package com.sistema.biblioteca.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.biblioteca.dto.request.LibroRequest;
import com.sistema.biblioteca.entity.Libro;
import com.sistema.biblioteca.service.LibroService;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:5173")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public ResponseEntity<List<Libro>> listarTodos() {
        return ResponseEntity.ok(libroService.listarTodos());
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Libro> buscarPorIsbn(@PathVariable String isbn) {
        return ResponseEntity.ok(libroService.buscarPorIsbn(isbn));
    }

    @GetMapping("/autor/{cedula}")
    public ResponseEntity<List<Libro>> listarPorAutorCedula(@PathVariable String cedula) {
        return ResponseEntity.ok(libroService.listarPorAutorCedula(cedula));
    }

    @PostMapping
    public ResponseEntity<Libro> crear(@RequestBody LibroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(libroService.crear(request));
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<Libro> actualizar(@PathVariable String isbn, @RequestBody LibroRequest request) {
        return ResponseEntity.ok(libroService.actualizar(isbn, request));
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> eliminar(@PathVariable String isbn) {
        libroService.eliminar(isbn);
        return ResponseEntity.noContent().build();
    }
}