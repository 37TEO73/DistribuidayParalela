package com.sistema.biblioteca.dto.request;

public class AutorRequest {

    private String cedula;
    private String nombreCompleto;
    private String nacionalidad;

    public AutorRequest() {
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

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }
}