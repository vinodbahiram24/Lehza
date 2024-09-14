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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lehza.lehza_ethnics.dto.OrdersDto;
import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Orders;
import com.lehza.lehza_ethnics.mapper.OrdersMapper;
import com.lehza.lehza_ethnics.service.OrderService;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	OrdersMapper orderMapper;
	
	@GetMapping("/getOrdersByUser/{username}")
	public ResponseEntity<List<OrdersDto>> getOrdersByUser(@PathVariable String username)
	{
		return new ResponseEntity<>(orderService.getOrderByUser(username), HttpStatus.OK);
	}
	
	@GetMapping("/getAllOrders")
	public ResponseEntity<List<OrdersDto>> getAllOrders()
	{
		return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
	}
	
	@GetMapping("/getOrderedProducts")
	public ResponseEntity<List<ProductsDto>> getOrderedProducts()
	{
		return new ResponseEntity<>(orderService.getOrderedProducts(), HttpStatus.OK);
	}
	
	@PostMapping("/createOrder/{username}")
	public ResponseEntity<List<OrdersDto>> createOrder(@PathVariable String username)
	{
		
		   List<OrdersDto> responseOrder = orderService.createOrder(username);
		   return new ResponseEntity<>(responseOrder,HttpStatus.CREATED);
	   
	}
	
	@DeleteMapping("/deleteOrder/{id}")
	public ResponseEntity<String> deleteOrder(@PathVariable String id)
	{
		return new ResponseEntity<>(orderService.deleteOrder(id), HttpStatus.OK);
	}

}
