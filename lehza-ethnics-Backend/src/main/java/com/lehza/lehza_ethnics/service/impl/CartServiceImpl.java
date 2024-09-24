package com.lehza.lehza_ethnics.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.entities.Cart;
import com.lehza.lehza_ethnics.entities.Products;
import com.lehza.lehza_ethnics.entities.Users;
import com.lehza.lehza_ethnics.mapper.CartMapper;
import com.lehza.lehza_ethnics.repository.CartRepository;
import com.lehza.lehza_ethnics.repository.ProductsRepository;
import com.lehza.lehza_ethnics.repository.UsersRepository;
import com.lehza.lehza_ethnics.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	CartRepository cartRepo;
	
	@Autowired
	CartMapper cartMapper;
	
	@Autowired
	ProductsRepository prodRepo;
	
	@Autowired
	UsersRepository userRepo;
	
	@Autowired
	JWTService jwtService;

	@Override
	public Cart addCart(Cart cart, HttpServletRequest request)
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		
	    if(cartRepo.getCartByUsername(username)!=null && cartRepo.getCartByProduct(cart.getProduct().getProdId())!=null)
	    {
	    	Cart existingCart = updateQty(request, cart.getQuantity(),cart.getProduct().getProdId());
	    	return existingCart;
	    }
	    else	
	    {	
	    	Users user = userRepo.getUserByUsername(username);
	 	    cart.setUser(user);
	 	    
	 	    Products prod = prodRepo.getById(cart.getProduct().getProdId());     
		    cart.setProduct(prod);
		    
		    cart.setTotalAmount(cart.getProduct().getPrice()*cart.getQuantity());
		    // Save and return the cart
		    return cartRepo.save(cart);
	    } 
	}

	@Override
	public Cart updateQty(HttpServletRequest request, Integer qty, Integer prodId) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		Cart existingCart = cartRepo.getCartByUsernameAndProd(username, prodId);
		existingCart.setQuantity(qty);
		existingCart.setTotalAmount(existingCart.getProduct().getPrice()*existingCart.getQuantity());
		return cartRepo.save(existingCart);
	}

	@Override
	public String deleteCart(HttpServletRequest request, Integer prodId) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		Cart existingCart = cartRepo.getCartByUsernameAndProd(username,prodId);
		cartRepo.delete(existingCart);
		return "Cart Deleted!";
	}

	@Override
	public List<CartDto> getAllByUsername(HttpServletRequest request) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		return cartRepo.getCartByUsername(username).stream().map((e)-> cartMapper.cartToDto(e)).collect(Collectors.toList());
	}
	
	

	
}


