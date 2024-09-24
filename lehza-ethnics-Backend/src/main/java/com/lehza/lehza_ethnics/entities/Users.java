package com.lehza.lehza_ethnics.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name="users")
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	@Column(nullable = false, unique = true)
	private String username;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String mobile;
	
	@Column(nullable = false)
	private String password;
	
	private String address;
	private String city;
	private Integer pincode;
	private String state;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Cart> carts;
	
	@ManyToOne
	@JoinColumn(name = "roleId", referencedColumnName = "roleId")
	@JsonIgnore
	private Role role;
}
