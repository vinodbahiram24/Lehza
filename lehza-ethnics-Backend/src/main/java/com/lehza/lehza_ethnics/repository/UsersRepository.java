package com.lehza.lehza_ethnics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lehza.lehza_ethnics.entities.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
	
	@Query(value = "Select * from Users where username= :Username" , nativeQuery = true)
	Users getUserByUsername(@Param("Username") String Username);
	
	@Query(value = "Select * from Users where password= :password" , nativeQuery = true)
	Users getUserByPassword(@Param("password") String password);
	
	@Query(value = "Select * from Users where user_id= :id", nativeQuery = true)
	Users getById(@Param("id") Integer id);

	@Query(value = "select * from Users where email= :email and username= :username" , nativeQuery = true)
	Users existsByEmail(@Param("email") String email, @Param("username") String username);

}
