package com.lehza.lehza_ethnics.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.lehza.lehza_ethnics.dto.CategoriesDto;
import com.lehza.lehza_ethnics.entities.Categories;

@Component
public class CategoriesMapper {

	private ModelMapper modelMapper;
	
	public Categories dtoToCategories(CategoriesDto categoriesDto)
	{
		return modelMapper.map(categoriesDto, Categories.class);
	}
	
	public CategoriesDto categoriesToDto(Categories categories)
	{
		return this.modelMapper.map(categories, CategoriesDto.class);
	}
}
