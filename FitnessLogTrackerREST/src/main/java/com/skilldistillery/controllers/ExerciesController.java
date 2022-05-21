package com.skilldistillery.controllers;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin({ "*", "http://localhost:4203" })
public class ExerciesController {
	
	@Autowired
	private ExerciseSetService service;
	
	@GetMapping("exerciseset")
	public List<ExerciseSet> index(){
		return service.index();
	}
	
	@GetMapping("exerciseset/{id}")
	public ExerciseSet findSet(@PathVariable Integer id, HttpServletResponse resp) {
		ExerciseSet res = service.findById(id);
		if(res == null) {
			resp.setStatus(404);
		}
		return res;
	}
	
	@PostMapping("exerciseset")
	public ExerciseSet addSet(@RequestBody ExerciseSet exerciseSet, HttpServletResponse resp, HttpServletRequest req) {
		exerciseSet = service.create(exerciseSet);
		if(exerciseSet == null) {
			resp.setStatus(404);
		}
		else {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(exerciseSet.getId());
			resp.setHeader("Location", url.toString());
		}
		return exerciseSet;
	}
	
	@PutMapping("exerciseset/{id}")
	public ExerciseSet updateSet(@RequestBody ExerciseSet exerciseSet, @PathVariable Integer id, HttpServletResponse resp) {
		
		try {
			exerciseSet =  service.update(exerciseSet, id);
			if(exerciseSet == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			exerciseSet = null;
		}
		
		
		return exerciseSet;
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
	
	@GetMapping("exerciseset/stats")
	public Map<String, Object> getStats() {
		return service.getStats();
	}
	
	
}
