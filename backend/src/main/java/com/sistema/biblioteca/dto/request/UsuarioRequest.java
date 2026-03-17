package com.sistema.biblioteca.dto.request;

public class UsuarioRequest {

    private String userName;
    private String password;
    private String tipo;

    public UsuarioRequest() {
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getTipo() {
        return tipo;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}