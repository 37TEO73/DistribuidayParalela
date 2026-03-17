package com.sistema.biblioteca.dto.request;

public class LibroRequest {

    private String isbn;
    private String titulo;
    private String editorial;
    private String genero;
    private Integer anioPublicacion;
    private String autorCedula;

    public LibroRequest() {
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

    public String getAutorCedula() {
        return autorCedula;
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

    public void setAutorCedula(String autorCedula) {
        this.autorCedula = autorCedula;
    }
}