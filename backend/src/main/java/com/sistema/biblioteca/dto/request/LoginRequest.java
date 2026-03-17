package com.sistema.biblioteca.dto.request;

public class LoginRequest {

    private String userName;
    private String password;

    public LoginRequest() {
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}