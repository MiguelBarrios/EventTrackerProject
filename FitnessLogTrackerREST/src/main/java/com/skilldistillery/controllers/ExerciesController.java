package com.skilldistillery.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.ExerciseSet;
import com.skilldistillery.services.ExerciseSetService;

@RestController
@RequestMapping("api")
public class ExerciesController {
	
	@Autowired
	private ExerciseSetService exerciseService;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("exerciseset/all")
	public List<ExerciseSet> findAll(){
		
	}
	
	@GetMapping("exerciseset/{id}")
	public ExerciseSet findSet(@PathVariable Integer id) {
		return exerciseService.findById(id);
	}
	
	
}
