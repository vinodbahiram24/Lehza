package com.lehza.lehza_ethnics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lehza.lehza_ethnics.entities.Products;
import com.lehza.lehza_ethnics.mapper.ProductsMapper;
import com.lehza.lehza_ethnics.service.ProductsService;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductsController{
	
	@Autowired
	ProductsService productsService;
	
	@Autowired
	ProductsMapper productMapper;
	
	@GetMapping("/getProductsByCategory/{category_id}")
	public ResponseEntity<List<Products>> getAllProducts(@PathVariable Integer category_id)
	{

		return new ResponseEntity<>(productsService.getProductsByCategory(category_id),HttpStatus.OK);
	}
	
	@GetMapping("/getAllProducts/{category}")
	public ResponseEntity<List<Products>> getAll(@PathVariable String category)
	{
		return new ResponseEntity<>(productsService.getAllProducts(category),HttpStatus.OK);
	}
	
	@PutMapping("/updateProduct")
	public Products updateProduct(@RequestBody Products product)
	{
		return productsService.updateProduct(product);
	}
	
	@PostMapping("/addProducts")
	public Products addProducts(@RequestBody Products products)
	{
		return productsService.addProducts(products);
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	public String deleteProduct(@PathVariable Integer id)
	{
		return productsService.deleteProduct(id);
	}
	
}

