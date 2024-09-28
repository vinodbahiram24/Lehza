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

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UsersMapper usersMapper;

	@GetMapping("/getUserByUsername")
	public Users getUserByUsername(HttpServletRequest request)
	{
		return userService.getUserByUsername(request); 
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody UsersDto usersDto)
	{
		if(userService.checkEmailandUsername(usersDto.getEmail(),usersDto.getUsername()))
		{
			return new ResponseEntity<>("UserName or Email Already Exists!!", HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(userService.createUser(usersDto),HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> authUser(@RequestBody Users user)
	{
		String token = userService.authUser(user);		
		return new ResponseEntity<>(token , HttpStatus.OK);
				
	}
	
	@PostMapping("/verifyUser")
	public ResponseEntity<String> verifyUser(@RequestBody UsersDto userDto)
	{	
		if(userService.checkEmailandUsername(userDto.getEmail(), userDto.getUsername()))
		{
			return new ResponseEntity<>("true", HttpStatus.OK);
		}
		return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody UsersDto userDto)
	{
		String res = userService.resetPassword(userDto.getUsername(), userDto.getPassword());
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/updateUser")
	public UsersDto updateUser(@RequestBody Users user, HttpServletRequest request)
	{
		UsersDto usersDto = usersMapper.usersToDto(user);
		return userService.updateUserByUsername(usersDto, request);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public String deleteUser(@PathVariable Integer id)
	{
		return userService.deleteUserById(id);
	}
}
