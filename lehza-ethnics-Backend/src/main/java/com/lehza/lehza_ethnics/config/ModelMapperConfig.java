package com.lehza.lehza_ethnics.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.lehza.lehza_ethnics.dto.CartDto;
import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Cart;
import com.lehza.lehza_ethnics.entities.Users;

@Configuration
public class ModelMapperConfig {
	
	 @Bean
	    ModelMapper modelMapper() {
			
	    	ModelMapper modelMapper = new ModelMapper();
	        // Custom mapping for UsersDto to Users
	        modelMapper.addMappings(new PropertyMap<UsersDto, Users>() {
	            @Override
	            protected void configure() {
	                // Map roleDto to role
	                map().getRole().setRoleId(source.getRole().getRoleId());
	                map().getRole().setRoleName(source.getRole().getRoleName());
	            }
	        });
	        
	        modelMapper.typeMap(CartDto.class, Cart.class).addMappings(mapper -> {
	            mapper.map(CartDto::getProduct, Cart::setProduct);
	        });

	        return modelMapper;
		}

}
