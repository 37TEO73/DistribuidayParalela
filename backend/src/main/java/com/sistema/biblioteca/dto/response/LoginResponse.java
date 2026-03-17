package com.sistema.biblioteca.dto.response;

public class LoginResponse {

    private Long id;
    private String userName;
    private String tipo;
    private String token;
    private String mensaje;

    public LoginResponse() {
    }

    public LoginResponse(Long id, String userName, String tipo, String token, String mensaje) {
        this.id = id;
        this.userName = userName;
        this.tipo = tipo;
        this.token = token;
        this.mensaje = mensaje;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getTipo() {
        return tipo;
    }

    public String getToken() {
        return token;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}