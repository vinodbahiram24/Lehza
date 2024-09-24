package com.lehza.lehza_ethnics.service;

import java.util.List;

import com.lehza.lehza_ethnics.dto.OrdersDto;
import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Orders;

import jakarta.servlet.http.HttpServletRequest;

public interface OrderService {
	
	List<OrdersDto> getOrderByUser(HttpServletRequest request);
	
	List<OrdersDto> getAllOrders();
	
	List<ProductsDto> getOrderedProducts();
	
	List<OrdersDto> createOrder(HttpServletRequest request);
	
	Orders updateOrderStatus(Integer id, String status);
	
	String deleteOrder(Integer orderId);

	
	

}
