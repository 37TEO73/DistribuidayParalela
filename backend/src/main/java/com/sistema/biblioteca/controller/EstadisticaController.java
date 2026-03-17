package com.sistema.biblioteca.controller;

import com.sistema.biblioteca.dto.response.EstadisticaAutorResponse;
import com.sistema.biblioteca.service.EstadisticaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadisticas")
@CrossOrigin(origins = "http://localhost:5173")
public class EstadisticaController {

    private final EstadisticaService estadisticaService;

    public EstadisticaController(EstadisticaService estadisticaService) {
        this.estadisticaService = estadisticaService;
    }

    @GetMapping("/libros-por-autor")
    public ResponseEntity<List<EstadisticaAutorResponse>> obtenerLibrosPorAutor() {
        return ResponseEntity.ok(estadisticaService.obtenerLibrosPorAutor());
    }
}