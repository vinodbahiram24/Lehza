package com.lehza.lehza_ethnics.service;

import java.util.List;

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.entities.Cart;

import jakarta.servlet.http.HttpServletRequest;

public interface CartService {
	
	Cart addCart (Cart cart, HttpServletRequest request);
	
	Cart updateQty(HttpServletRequest request, Integer qty, Integer prodId);
	
	String deleteCart(HttpServletRequest request,Integer prodId);
	
	List<CartDto> getAllByUsername(HttpServletRequest request);

}
