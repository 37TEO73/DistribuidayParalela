package com.sistema.biblioteca.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "autores")
public class Autor {

    @Id
    @Column(nullable = false, unique = true, length = 20)
    private String cedula;

    @Column(name = "nombre_completo", nullable = false, length = 120)
    private String nombreCompleto;

    @Column(nullable = false, length = 80)
    private String nacionalidad;

    public Autor() {
    }

    public Autor(String cedula, String nombreCompleto, String nacionalidad) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.nacionalidad = nacionalidad;
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