package com.lehza.lehza_ethnics.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "products")
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer prodId;
	
	@Column(nullable = false)
	private String brand;
	
	@Column(nullable = false)
	private String image;
	
	@ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "catId")
	@JsonBackReference
    private Categories category;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private Integer availableQty;
	
	@Column(nullable = false)
	private float price;
	
	@OneToMany(mappedBy = "product")
	@JsonBackReference
	private List<Cart> carts;
}
