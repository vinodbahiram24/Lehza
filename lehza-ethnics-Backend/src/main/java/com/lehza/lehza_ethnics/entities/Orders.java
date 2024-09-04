package com.lehza.lehza_ethnics.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="orders")
public class Orders {
	
	@Id
	private String orderId;
	
	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "userId")
	@JsonManagedReference
	private Users user;
	
	@ManyToOne
	@JoinColumn(name= "prodId", referencedColumnName = "prodId")
	@JsonManagedReference
	private Products product;
	
	private LocalDate date;
	private String status;
	private Integer quantity;
	private Float amount;
	
}
