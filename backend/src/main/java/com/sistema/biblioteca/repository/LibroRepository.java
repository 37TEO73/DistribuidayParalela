package com.sistema.biblioteca.repository;

import com.sistema.biblioteca.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, String> {
    List<Libro> findByAutorCedula(String cedula);
    long countByAutorCedula(String cedula);
}