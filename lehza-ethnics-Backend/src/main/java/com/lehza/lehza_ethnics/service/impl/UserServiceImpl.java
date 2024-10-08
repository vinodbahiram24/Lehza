package com.lehza.lehza_ethnics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;
import com.lehza.lehza_ethnics.mapper.UsersMapper;
import com.lehza.lehza_ethnics.repository.UsersRepository;
import com.lehza.lehza_ethnics.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UsersRepository userRepo;
	
	@Autowired
	private UsersMapper userMapper;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTService jwtService;

	@Override
	public Users getUserByUsername(HttpServletRequest request) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		
		try {
			Users user = userRepo.getUserByUsername(username);
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
	
//	@Override
//	public String authUser(Users user)
//	{
//		try 
//		{	
//			Users existingUser = userRepo.getUserByUsername(user.getUsername());
//			if(existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
//			{
//				return "AUTHORIZED";
//			}
//			else
//			{
//				return "NOT AUTHORIZED";
//			}	
//				
//		} 
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//			
//	}
	
	@Override
	public String authUser(Users user) {
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
	        );
	        
	        if (authentication.isAuthenticated()) {
	            return jwtService.generateToken(user.getUsername());
	        }
	        
	    } catch (AuthenticationException ex) {
	        
	        return "UNAUTHORIZED"; 
	    }
	 
	    return "UNAUTHORIZED";
	}

	

	@Override
	public UsersDto updateUserByUsername(UsersDto usersDto, HttpServletRequest request) 
	{
		String username = jwtService.extractUserName(request.getHeader("Authorization").substring(7));
		
		UsersDto existingUser = userMapper.usersToDto(userRepo.getUserByUsername(username));
	
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
	public Boolean checkEmailandUsername(String email, String username) {

		Users user = userRepo.existsByEmailAndUsername(email, username);
		if(user != null){
			return true;
		}
		return false;
	}

	@Override
	public String resetPassword(String username, String password) {
		Users user = userRepo.getUserByUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		userRepo.save(user);
		return "Password Updated";
	}
	
	

}
