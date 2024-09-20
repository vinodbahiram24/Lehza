package com.lehza.lehza_ethnics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lehza.lehza_ethnics.entities.Orders;
import com.lehza.lehza_ethnics.entities.Products;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	@Query(value = "Select * from orders where user_id = (Select user_id from users where username = :username)", nativeQuery = true)
	List<Orders> getOrdersByUsername(@Param("username") String username);
	
	@Query(value = "Select * from orders where order_id= :id", nativeQuery = true)
	Orders getById(@Param("id") Integer id);

}
