package com.sistema.biblioteca.dto.response;

import java.util.List;

public class ReporteAutorResponse {

    private String cedula;
    private String nombreCompleto;
    private String nacionalidad;
    private List<ReporteLibroItem> libros;

    public ReporteAutorResponse() {
    }

    public ReporteAutorResponse(String cedula, String nombreCompleto, String nacionalidad, List<ReporteLibroItem> libros) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.nacionalidad = nacionalidad;
        this.libros = libros;
    }

    public String getCedula() {
        return cedula;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public List<ReporteLibroItem> getLibros() {
        return libros;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public void setLibros(List<ReporteLibroItem> libros) {
        this.libros = libros;
    }
}