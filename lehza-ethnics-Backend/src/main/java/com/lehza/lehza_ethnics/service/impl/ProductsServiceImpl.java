package com.lehza.lehza_ethnics.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Products;
import com.lehza.lehza_ethnics.mapper.ProductsMapper;
import com.lehza.lehza_ethnics.repository.ProductsRepository;
import com.lehza.lehza_ethnics.service.ProductsService;

@Service
public class ProductsServiceImpl implements ProductsService {

	@Autowired
	ProductsRepository productsRepo;
	
	@Autowired
	ProductsMapper productsMapper;
	
	@Override
	public List<Products> getProductsByCategory(Integer category_id) 
	{
		return productsRepo.findByCategory(category_id);
	}
	
	@Override
	public List<Products> getAllProducts(String category) {
		
		return productsRepo.findAllByCategory(category);
	}

	@Override
	public Products addProducts(Products products) 
	{
		Products savedProd = productsRepo.save(products);
		return savedProd;
	}

	@Override
	public String deleteProduct(Integer id) {
		productsRepo.deleteById(id);
		return "Product deleted Successfully..!!";
	}

	@Override
	public Products updateProduct(Products product) {
		Products p = productsRepo.getById(product.getProdId());
		p.setProdId(product.getProdId());
		p.setAvailableQty(product.getAvailableQty());
		p.setBrand(product.getBrand());
		p.setCategory(product.getCategory());
		p.setDescription(product.getDescription());
		p.setImage(product.getImage());
		p.setPrice(product.getPrice());
		p.setTitle(product.getTitle());
		
		productsRepo.save(p);
		return p;
	}

	

}
