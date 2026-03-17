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

import com.sistema.biblioteca.dto.request.AutorRequest;
import com.sistema.biblioteca.entity.Autor;
import com.sistema.biblioteca.service.AutorService;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "http://localhost:5173")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @GetMapping
    public ResponseEntity<List<Autor>> listarTodos() {
        return ResponseEntity.ok(autorService.listarTodos());
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<Autor> buscarPorCedula(@PathVariable String cedula) {
        return ResponseEntity.ok(autorService.buscarPorCedula(cedula));
    }

    @PostMapping
    public ResponseEntity<Autor> crear(@RequestBody AutorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(autorService.crear(request));
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Autor> actualizar(@PathVariable String cedula, @RequestBody AutorRequest request) {
        return ResponseEntity.ok(autorService.actualizar(cedula, request));
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> eliminar(@PathVariable String cedula) {
        autorService.eliminar(cedula);
        return ResponseEntity.noContent().build();
    }
}