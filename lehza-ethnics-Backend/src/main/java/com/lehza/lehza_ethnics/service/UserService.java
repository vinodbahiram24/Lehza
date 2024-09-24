package com.lehza.lehza_ethnics.service;

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	
	Boolean checkEmailandUsername(String email, String username);
	
	//Get
	Users getUserByUsername(HttpServletRequest request);
	
	//Post
	String createUser(UsersDto userDto);
	
	String authUser(Users user);
	
	//Put
	UsersDto updateUserByUsername(UsersDto userDto, HttpServletRequest request);
	
	//Delete
	String deleteUserById(Integer id);
	
	

}
