package com.skilldistillery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.entities.ExerciseSet;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Integer> {
	List<ExerciseSet> findByExerciseName(String name);
	
	@Query("SELECT SUM(e.weight * e.reps) from ExerciseSet e")
	int getTotalVolume();
	
	@Query("SELECT DISTINCT(e.exerciseName) FROM ExerciseSet e")
	List<String> getDistinctExercise();
	
	@Query("SELECT e.exerciseName, SUM(e.weight * e.reps) FROM ExerciseSet e GROUP BY e.exerciseName")
	List<Object[]> getTotalVolumePerExercie();
	
	@Query("SELECT DATE(e.datetime), SUM(e.weight * e.reps), e.exerciseName FROM ExerciseSet e GROUP BY e.exerciseName, DATE(e.datetime)")
	List<Object[]> getTotalVolumePerExercisePerDay();
	
	@Query("SELECT COUNT(DISTINCT(DATE(e.datetime))) FROM ExerciseSet e")
	int getNumberOfDaysWorkedOut();
}
