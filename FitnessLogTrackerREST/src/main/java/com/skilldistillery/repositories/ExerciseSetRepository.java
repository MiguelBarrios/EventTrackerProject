package com.skilldistillery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.ExerciseSet;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Integer> {
	List<ExerciseSet> findByExerciseName(String name);
}
