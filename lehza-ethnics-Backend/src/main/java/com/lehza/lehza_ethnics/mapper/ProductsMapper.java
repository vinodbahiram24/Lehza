package com.lehza.lehza_ethnics.mapper;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Products;

@Component
public class ProductsMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Products dtoToProducts(ProductsDto productsDto)
	{
		return modelMapper.map(productsDto, Products.class);
	}
	
	public ProductsDto productsToDto(Products products)
	{
		return this.modelMapper.map(products, ProductsDto.class);
	}


}
