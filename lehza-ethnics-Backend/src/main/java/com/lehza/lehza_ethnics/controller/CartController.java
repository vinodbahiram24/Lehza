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

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.entities.Cart;
import com.lehza.lehza_ethnics.mapper.CartMapper;
import com.lehza.lehza_ethnics.service.CartService;

@CrossOrigin
@RestController
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	CartMapper cartMapper;
	
	@Autowired
	CartService cartService;
	
	@GetMapping("/getAllCart/{username}")
	public ResponseEntity<List<CartDto>> getAllCart(@PathVariable String username)
	{
		return new ResponseEntity<>(cartService.getAllByUsername(username),HttpStatus.OK);
	}
	
	@PostMapping("/addCart/{username}")
	public ResponseEntity<CartDto> addCart(@RequestBody CartDto cartDto, @PathVariable String username){
	    Cart cart = cartMapper.dtoToCart(cartDto);
	    Cart newCart = cartService.addCart(cart, username);
	    
	    if (newCart == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // or handle the error appropriately
	    }
	    
	    CartDto responseDto = cartMapper.cartToDto(newCart);
	    return new ResponseEntity<>(responseDto, HttpStatus.CREATED); // Or HttpStatus.OK based on the logic
	}
	
	@PutMapping("/updateQty/{username}/{qty}/{prodId}")
	public ResponseEntity<CartDto> updateQty(@PathVariable String username,@PathVariable Integer qty,@PathVariable Integer prodId )
	{
		return new ResponseEntity<>(cartMapper.cartToDto(cartService.updateQty(username, qty, prodId)),HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteCart/{username}/{prodId}")
	public ResponseEntity<String> deleteCart(@PathVariable String username, @PathVariable Integer prodId)
	{
		return new ResponseEntity<>(cartService.deleteCart(username, prodId),HttpStatus.OK);
	}

}
