package com.lehza.lehza_ethnics.controller;

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

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;
import com.lehza.lehza_ethnics.mapper.UsersMapper;
import com.lehza.lehza_ethnics.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UsersMapper usersMapper;

	@GetMapping("/getUserByUsername/{Username}")
	public Users getUserByUsername(@PathVariable String Username)
	{
		return userService.getUserByUsername(Username); 
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody Users user)
	{
		UsersDto usersDto = usersMapper.usersToDto(user);
		if(userService.checkEmailandUsername(usersDto.getEmail(),usersDto.getUsername()) != null)
		{
			return new ResponseEntity<>("User Already Exists!!", HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(userService.createUser(usersDto),HttpStatus.OK);
	}
	
	@PostMapping("/auth")
	public ResponseEntity<String> authUser(@RequestBody Users user)
	{
		String token = userService.authUser(user);
		if(token == "AUTHORIZED")
		return new ResponseEntity<>("AUTHORIZED", HttpStatus.OK);
		else
		return new ResponseEntity<>("NOT AUTHORIZED", HttpStatus.OK);
			
	}
	
	@PutMapping("/updateUser/{id}")
	public UsersDto updateUser(@RequestBody Users user, @PathVariable Integer id)
	{
		UsersDto usersDto = usersMapper.usersToDto(user);
		return userService.updateUserById(usersDto, id);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public String deleteUser(@PathVariable Integer id)
	{
		return userService.deleteUserById(id);
	}
}
