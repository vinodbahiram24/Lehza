package com.lehza.lehza_ethnics.service;

import java.util.List;

import com.lehza.lehza_ethnics.entities.Products;

public interface ProductsService {
	//GET
	List<Products> getProductsByCategory(Integer category_id);
	
	List<Products> getAllProducts(String category);
	
	//POST
	Products addProducts(Products products);
 
	//PUT
	Products updateProduct(Products product);
	
	//DELETE
	String deleteProduct(Integer id);
}
