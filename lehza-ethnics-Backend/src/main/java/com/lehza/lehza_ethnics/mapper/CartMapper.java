package com.lehza.lehza_ethnics.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.entities.Cart;

@Component
public class CartMapper {
	
	@Autowired
	private ModelMapper modelMpper;
	
	public Cart dtoToCart(CartDto cartDto)
	{
		return modelMpper.map(cartDto, Cart.class);
	}
	
	public CartDto cartToDto(Cart cart)
	{
		return modelMpper.map(cart, CartDto.class);
	}
}


