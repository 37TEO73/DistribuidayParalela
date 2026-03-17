package com.sistema.biblioteca.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.biblioteca.dto.response.ReporteAutorResponse;
import com.sistema.biblioteca.service.ReporteService;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "http://localhost:5173")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/autores/{cedula}")
    public ResponseEntity<ReporteAutorResponse> obtenerReportePorCedula(@PathVariable String cedula) {
        return ResponseEntity.ok(reporteService.obtenerReportePorCedula(cedula));
    }
}