package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.ExerciseSet;

public interface ExerciseSetService {

	ExerciseSet findById(int id);

	List<ExerciseSet> index();

	List<ExerciseSet> findByExerciseName(String name);

	ExerciseSet create(ExerciseSet set);

}
