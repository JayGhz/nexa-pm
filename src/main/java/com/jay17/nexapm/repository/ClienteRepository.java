package com.jay17.nexapm.repository;

import com.jay17.nexapm.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID> {

    List<Cliente> findBySectorIgnoreCase(String sector);

    boolean existsByRazonSocialIgnoreCase(String razonSocial);
}
