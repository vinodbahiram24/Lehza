package com.lehza.lehza_ethnics.service;

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;

public interface UserService {
	
	Users checkEmailandUsername(String email, String username);
	
	//Get
	Users getUserByUsername(String Username);
	
	//Post
	String createUser(UsersDto userDto);
	
	String authUser(Users user);
	
	//Put
	UsersDto updateUserById(UsersDto userDto, Integer id);
	
	//Delete
	String deleteUserById(Integer id);
	
	

}
