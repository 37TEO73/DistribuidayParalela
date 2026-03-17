package com.sistema.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.biblioteca.entity.Autor;

public interface AutorRepository extends JpaRepository<Autor, String> {
}