package com.lehza.lehza_ethnics.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class OrdersDto {
	
	private String orderId;
	
	private UsersDto user;
	
	private ProductsDto product;
	
	private LocalDate date;
	
	private String status;
	
	private Integer quantity;
	
	private Float amount;

}
