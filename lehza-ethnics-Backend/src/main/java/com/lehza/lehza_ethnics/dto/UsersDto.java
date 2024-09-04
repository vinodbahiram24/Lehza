package com.lehza.lehza_ethnics.dto;

import lombok.Data;

@Data
public class UsersDto {
	
	private Integer userId;
	
	private String username;
	
	private String email;
	
	private String mobile;
	
	private String password;
	
	private String address;
	
	private String city;
	
	private Integer pincode;
	
	private String state;
	
	private RoleDto role;

}
