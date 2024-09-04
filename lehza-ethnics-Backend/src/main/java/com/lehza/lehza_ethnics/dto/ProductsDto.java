package com.lehza.lehza_ethnics.dto;

import lombok.Data;

@Data
public class ProductsDto {

	private Integer prodId;
	
	private String brand;
	
	private String image;
	
	private CategoriesDto categoryDto;
	
	private String title;
	
	private String description;
	
	private Integer availableQty;
	
	private float price;
}
