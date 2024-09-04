package com.lehza.lehza_ethnics.service;

import java.util.List;

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.entities.Cart;

public interface CartService {
	
	Cart addCart (Cart cart, String username);
	
	Cart updateQty(String username, Integer qty, Integer prodId);
	
	String deleteCart(String username,Integer prodId);
	
	List<CartDto> getAllByUsername(String username);

}
