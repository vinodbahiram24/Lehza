package com.lehza.lehza_ethnics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;
import com.lehza.lehza_ethnics.mapper.UsersMapper;
import com.lehza.lehza_ethnics.repository.UsersRepository;
import com.lehza.lehza_ethnics.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UsersRepository userRepo;
	
	@Autowired
	private UsersMapper userMapper;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public Users getUserByUsername(String Username) 
	{
		
		try {
			Users user = userRepo.getUserByUsername(Username);
			return user ;
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public String createUser(UsersDto userDto) 
	{
		if(userDto.getUsername() != null && !userDto.getUsername().isEmpty() &&
				   userDto.getEmail() != null && !userDto.getEmail().isEmpty() &&
				   userDto.getMobile() != null && !userDto.getMobile().isEmpty() &&
				   userDto.getPassword() != null && !userDto.getPassword().isEmpty()) 
		{
			Users user = userMapper.dtoToUsers(userDto);
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			try {
				userRepo.save(user);
				return "User Created Successfully..!";
			} catch (Exception e) {
				e.printStackTrace();
				return "Failed to Create User..!";
			}
		}
		
		return "All fields are Mandatory!";
		
				
	}
	
	@Override
	public String authUser(Users user)
	{
		try 
		{	
			Users existingUser = userRepo.getUserByUsername(user.getUsername());
			if(existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
			{
				return "AUTHORIZED";
			}
			else
			{
				return "NOT AUTHORIZED";
			}	
				
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
			
	}

	@Override
	public UsersDto updateUserById(UsersDto usersDto, Integer id) 
	{
		UsersDto existingUser = userMapper.usersToDto(userRepo.getById(id));
	
		if (usersDto.getAddress() != null && !usersDto.getAddress().equals("") ) {
	        existingUser.setAddress(usersDto.getAddress());
	    }
	    if (usersDto.getCity() != null && !usersDto.getCity().equals("")) {
	        existingUser.setCity(usersDto.getCity());
	    }
	    if (usersDto.getEmail() != null && !usersDto.getEmail().equals("")) {
	        existingUser.setEmail(usersDto.getEmail());
	    }
	    if (usersDto.getMobile() != null && !usersDto.getMobile().equals("")) {
	        existingUser.setMobile(usersDto.getMobile());
	    }
	    if (usersDto.getPincode() != null && !usersDto.getPincode().equals("")) {
	        existingUser.setPincode(usersDto.getPincode());
	    }
	    if (usersDto.getState() != null && !usersDto.getState().equals("")) {
	        existingUser.setState(usersDto.getState());
	    }
	    if (usersDto.getUsername() != null && !usersDto.getAddress().equals("")) {
	        existingUser.setUsername(usersDto.getUsername());
	    }
	    if (usersDto.getRole() != null) {
	        existingUser.setRole(usersDto.getRole());
	    }
	    if (usersDto.getPassword() != null && !usersDto.getPassword().equals("")) {
	        existingUser.setPassword(passwordEncoder.encode(existingUser.getPassword()));
	    }
	    
		Users savedUser = userRepo.save(userMapper.dtoToUsers(existingUser));
		
		return userMapper.usersToDto(savedUser);
	}

	@Override
	public String deleteUserById(Integer id) 
	{
		try {
			userRepo.deleteById(id);
			return "User Deleted..!";
			
		} catch (Exception e) {
			e.printStackTrace();
			return "User Not Exists..!";
		}
		
	}

	@Override
	public Users checkEmailandUsername(String email, String username) {

		return userRepo.existsByEmail(email, username);
	}
	
	

}
