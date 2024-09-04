package com.lehza.lehza_ethnics.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="cart")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="cartId")
	private Integer cartId;
	
	@ManyToOne
	@JoinColumn(name= "userId", referencedColumnName = "userId")
	@JsonIgnore
	private Users user;
	
	@ManyToOne
	@JoinColumn(name= "productsId", referencedColumnName = "prodId")
	@JsonIgnore
	private Products product;
	private Integer quantity;
	
	private Float totalAmount;
	

}


