package com.skilldistillery.services;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.ExerciseSet;
import com.skilldistillery.repositories.ExerciseSetRepository;

@Service
public class ExerciseSetServiceImpl implements ExerciseSetService {

	@Autowired
	private ExerciseSetRepository exerciseRepo;
	
	@Override
	public ExerciseSet findById(int id) {
		Optional<ExerciseSet> option = exerciseRepo.findById(id);
		return (option.isPresent()) ? option.get() : null;
	}
	
	@Override
	public List<ExerciseSet> index(){
		return exerciseRepo.findAll();
	}
	
	@Override 
	public List<ExerciseSet> findByExerciseName(String name){
		return exerciseRepo.findByExerciseName(name);
	}
	
	@Override
	public ExerciseSet create(ExerciseSet set) {
		return exerciseRepo.saveAndFlush(set);
	}
	
	@Override
	public ExerciseSet update(ExerciseSet set, int id) {
		ExerciseSet managed = this.findById(id);
		managed.setDatetime(set.getDatetime());
		managed.setExerciseName(set.getExerciseName());
		managed.setReps(set.getReps());
		managed.setType(set.getType());
		managed.setWeight(set.getWeight());
		exerciseRepo.saveAndFlush(managed);
		return managed;
	}
	
	@Override
	public boolean delete(int id) {
		ExerciseSet set = this.findById(id);
		if(set != null) {
			exerciseRepo.delete(set);
			exerciseRepo.flush();
			return true;
		}
		return false;
	}

	@Override
	public Map<String, Object> getStats() {
		int totalVolume = exerciseRepo.getTotalVolume();
		List<String> names = exerciseRepo.getDistinctExercise();
		List<Object[]> totalVolumePerExercise = exerciseRepo.getTotalVolumePerExercie();
		
		List<Object[]> volumePerExercisePerDay = exerciseRepo.getTotalVolumePerExercisePerDay();
		int daysWorkedOut = exerciseRepo.getNumberOfDaysWorkedOut();
		
		System.out.println(totalVolume);
		System.out.println(names);
		for(Object[] arr : totalVolumePerExercise) {
			System.out.println(Arrays.toString(arr));
		}
		
		System.out.println("****");
		for(Object[] arr: volumePerExercisePerDay) {
			System.out.println(Arrays.toString(arr));
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("totalVolumePerExerciesPerDay", volumePerExercisePerDay);
		map.put("totalVolumePerExercise", totalVolumePerExercise);
		map.put("distinctExercies", names);
		map.put("totalVolume", totalVolume);
		
		map.put("daysWorkedOut", daysWorkedOut);
		
		return map;
	}
	
}
