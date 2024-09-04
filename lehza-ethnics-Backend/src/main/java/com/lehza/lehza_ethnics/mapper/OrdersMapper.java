package com.lehza.lehza_ethnics.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lehza.lehza_ethnics.dto.OrdersDto;
import com.lehza.lehza_ethnics.entities.Orders;

@Component
public class OrdersMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Orders dtoToOrders(OrdersDto ordersDto)
	{
		return modelMapper.map(ordersDto, Orders.class);
	}
	
	public OrdersDto ordersToDto(Orders orders)
	{
		return this.modelMapper.map(orders, OrdersDto.class);
	}
}
