package com.sistema.biblioteca.dto.response;

public class EstadisticaAutorResponse {

    private String cedula;
    private String nombreCompleto;
    private long totalLibros;

    public EstadisticaAutorResponse() {
    }

    public EstadisticaAutorResponse(String cedula, String nombreCompleto, long totalLibros) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.totalLibros = totalLibros;
    }

    public String getCedula() {
        return cedula;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public long getTotalLibros() {
        return totalLibros;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public void setTotalLibros(long totalLibros) {
        this.totalLibros = totalLibros;
    }
}