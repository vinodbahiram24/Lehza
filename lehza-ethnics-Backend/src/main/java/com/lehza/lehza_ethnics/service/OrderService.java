package com.lehza.lehza_ethnics.service;

import java.util.List;

import com.lehza.lehza_ethnics.dto.OrdersDto;
import com.lehza.lehza_ethnics.dto.ProductsDto;
import com.lehza.lehza_ethnics.entities.Orders;

public interface OrderService {
	
	List<OrdersDto> getOrderByUser(String username);
	
	List<OrdersDto> getAllOrders();
	
	List<ProductsDto> getOrderedProducts();
	
	List<OrdersDto> createOrder(String username);
	
	Orders updateOrderStatus(Integer id, String status);
	
	String deleteOrder(Integer orderId);

	
	

}
