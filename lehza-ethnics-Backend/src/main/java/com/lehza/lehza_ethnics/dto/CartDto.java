package com.lehza.lehza_ethnics.dto;

import lombok.Data;

@Data
public class CartDto {

	
	private Integer cartId;
	
	private UsersDto user;
	
	private ProductsDto product;
	
	private Integer quantity;
	
	private Float totalAmount;
}
