package com.skilldistillery.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.ExerciseSet;
import com.skilldistillery.services.ExerciseSetService;

@RestController
@RequestMapping("api")
public class ExerciesController {
	
	@Autowired
	private ExerciseSetService service;
	
	@GetMapping("exerciseset")
	public List<ExerciseSet> index(){
		return service.index();
	}
	
	@GetMapping("exerciseset/{id}")
	public ExerciseSet findSet(@PathVariable Integer id) {
		return service.findById(id);
	}
	
	@GetMapping("exerciseset/findbyname/{name}")
	public List<ExerciseSet> findByExerciseName(@PathVariable String name) {
		return service.findByExerciseName(name);
	}
	
	@PostMapping("exerciseset")
	public ExerciseSet addSet(@RequestBody ExerciseSet exerciseSet) {
		return service.create(exerciseSet);
	}
	
	@PutMapping("exerciseset/{id}")
	public ExerciseSet updateSet(@RequestBody ExerciseSet exerciseSet, @PathVariable Integer id) {
		return service.update(exerciseSet, id);
	}
	
	@DeleteMapping("exerciseset/{id}")
	public void deleteSet(@PathVariable Integer id, HttpServletResponse res) {
		boolean deleted = service.delete(id);
		if(deleted) {
			res.setStatus(200);
		}else {
			res.setStatus(404);
		}
	}
	
	
}
