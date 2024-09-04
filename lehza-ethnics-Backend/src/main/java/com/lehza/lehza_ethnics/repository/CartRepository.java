package com.lehza.lehza_ethnics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lehza.lehza_ethnics.entities.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	@Query(value = "SELECT * FROM cart WHERE user_id = (SELECT user_id FROM users WHERE username = :username)", nativeQuery = true)
	List<Cart> getCartByUsername(@Param ("username") String username);
	
	@Query(value = "Select * from cart where products_id= :prodId", nativeQuery = true)
	Cart getCartByProduct(@Param("prodId") Integer prodId);
	
	@Query(value = "SELECT * FROM cart WHERE user_id = (SELECT user_id FROM users WHERE username = :username) and products_id= :prodId", nativeQuery = true)
	Cart getCartByUsernameAndProd(@Param ("username") String username , @Param("prodId") Integer prodId);
 
}
