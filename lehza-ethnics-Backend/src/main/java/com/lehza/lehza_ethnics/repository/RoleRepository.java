package com.lehza.lehza_ethnics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lehza.lehza_ethnics.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
