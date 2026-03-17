package com.sistema.biblioteca.dto.response;

public class ReporteLibroItem {

    private String isbn;
    private String titulo;
    private String editorial;
    private String genero;
    private Integer anioPublicacion;

    public ReporteLibroItem() {
    }

    public ReporteLibroItem(String isbn, String titulo, String editorial, String genero, Integer anioPublicacion) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.editorial = editorial;
        this.genero = genero;
        this.anioPublicacion = anioPublicacion;
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
}