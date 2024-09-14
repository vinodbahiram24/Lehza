package com.lehza.lehza_ethnics.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
@Table(name="orders")
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderId;
	
	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "userId")
	@JsonManagedReference
	private Users user;
	
	@ManyToOne
	@JoinColumn(name= "prodId", referencedColumnName = "prodId")
	@JsonManagedReference
	private Products product;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yy")
	private LocalDate date;
	private String status;
	private Integer quantity;
	private Float amount;
	
	 // Transient field to add the OID prefix to orderId
    @Transient
    private String prefixedOrderId;

    public String getPrefixedOrderId() {
        return "OID" + this.orderId;  // OID with leading zeros (e.g., OID001)
    }
	
}


