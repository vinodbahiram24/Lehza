package com.lehza.lehza_ethnics.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lehza.lehza_ethnics.dto.UsersDto;
import com.lehza.lehza_ethnics.entities.Users;

@Component
public class UsersMapper {

	@Autowired
	private ModelMapper modelMapper;
	
	public Users dtoToUsers(UsersDto usersDto)
	{
		return modelMapper.map(usersDto, Users.class);
	}
	
	public UsersDto usersToDto(Users users) 
	{
		return this.modelMapper.map(users, UsersDto.class);
	}
}
