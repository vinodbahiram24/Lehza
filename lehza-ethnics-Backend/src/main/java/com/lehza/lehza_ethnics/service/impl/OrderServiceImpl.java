package com.lehza.lehza_ethnics.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lehza.lehza_ethnics.dto.OrdersDto;
import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Cart;
import com.lehza.lehza_ethnics.entities.Orders;
import com.lehza.lehza_ethnics.mapper.OrdersMapper;
import com.lehza.lehza_ethnics.mapper.ProductsMapper;
import com.lehza.lehza_ethnics.mapper.UsersMapper;
import com.lehza.lehza_ethnics.repository.CartRepository;
import com.lehza.lehza_ethnics.repository.OrdersRepository;
import com.lehza.lehza_ethnics.repository.ProductsRepository;
import com.lehza.lehza_ethnics.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	OrdersRepository orderRepo;
	
	@Autowired
	CartRepository cartRepo;
	
	@Autowired
	OrdersMapper orderMapper;
	
	@Autowired
	UsersMapper userMapper;
	
	@Autowired
	ProductsMapper prodMapper;
	
	@Autowired
	ProductsRepository productsRepo;
	
	@Autowired
	JWTService jwtService;
	
	
	@Override
	public List<OrdersDto> getOrderByUser(HttpServletRequest request) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		List<OrdersDto> orderDtoList = orderRepo.getOrdersByUsername(username).stream().map((e)-> orderMapper.ordersToDto(e)).collect(Collectors.toList());
		return orderDtoList;
	}

	@Override
	public List<OrdersDto> getAllOrders() 
	{
		List<OrdersDto> orderDtoList = orderRepo.findAll().stream().map((e)-> orderMapper.ordersToDto(e)).collect(Collectors.toList());
		return orderDtoList;
	}
	
	@Override
	public List<ProductsDto> getOrderedProducts()
	{
		 List<ProductsDto> productsListDto = productsRepo.getOrderedProducts().stream().map((e)->prodMapper.productsToDto(e)).collect(Collectors.toList());
		 return productsListDto;
	}

	@Override
	public List<OrdersDto> createOrder(HttpServletRequest request)
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		List<Cart> cartList = cartRepo.getCartByUsername(username);
		
		List<OrdersDto> orderListDto = new ArrayList<>();
		
		OrdersDto orderDto;
		for(Cart c : cartList) {
			orderDto = new OrdersDto();
			orderDto.setUser(userMapper.usersToDto(c.getUser()));
			orderDto.setProduct(prodMapper.productsToDto(c.getProduct()));
			orderDto.setDate(LocalDate.now());
			orderDto.setStatus("Order Processing");
			orderDto.setQuantity(c.getQuantity());
			orderDto.setAmount(c.getTotalAmount());
			orderListDto.add(orderDto);
		}
		
		List<Orders> orderList = orderListDto.stream().map((e)-> orderMapper.dtoToOrders(e)).collect(Collectors.toList());
		
		List<Orders> orderSuccess = orderRepo.saveAll(orderList);
		
		cartRepo.deleteAll();
		
		return orderSuccess.stream().map((e)-> orderMapper.ordersToDto(e)).collect(Collectors.toList());
	}

	@Override
	public Orders updateOrderStatus(Integer id, String status) {
		Orders existingOrder = orderRepo.getById(id);
		existingOrder.setStatus(status);
		return orderRepo.save(existingOrder);
	}

	@Override
	public String deleteOrder(Integer orderId) {
		orderRepo.deleteById(orderId);
		return "Order Deleted!";
	}

}
