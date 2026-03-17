package com.sistema.biblioteca.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "libros")
public class Libro {

    @Id
    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, length = 100)
    private String editorial;

    @Column(nullable = false, length = 50)
    private String genero;

    @Column(name = "anio_publicacion", nullable = false)
    private Integer anioPublicacion;

    @ManyToOne(optional = false)
    @JoinColumn(name = "autor_cedula", nullable = false)
    private Autor autor;

    public Libro() {
    }

    public Libro(String isbn, String titulo, String editorial, String genero, Integer anioPublicacion, Autor autor) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.editorial = editorial;
        this.genero = genero;
        this.anioPublicacion = anioPublicacion;
        this.autor = autor;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getEditorial() {
        return editorial;
    }

    public String getGenero() {
        return genero;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }
}