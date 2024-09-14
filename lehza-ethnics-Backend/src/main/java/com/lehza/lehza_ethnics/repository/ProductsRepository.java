package com.lehza.lehza_ethnics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lehza.lehza_ethnics.entities.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer>{
	
	@Query(value = "SELECT * FROM Products WHERE Products.category_id = :category_id", nativeQuery = true)
	List<Products> findByCategory(@Param("category_id") Integer category_id);

	
	@Query(value = "SELECT * FROM products JOIN categories ON products.category_id = categories.cat_id WHERE categories.name LIKE CONCAT('%', :category, '%');", nativeQuery = true)
	List<Products> findAllByCategory(@Param("category") String category);
	
	@Query(value= "SELECT * FROM Products WHERE prod_id = :id", nativeQuery = true)
	Products getById(@Param("id") Integer id);
	
	@Query(value = "SELECT p.prod_id, p.available_qty, p.brand, p.description, p.image, p.price, p.title, p.category_id FROM products p JOIN orders o ON p.prod_id = o.prod_id", nativeQuery = true)
	List<Products> getOrderedProducts();


}
