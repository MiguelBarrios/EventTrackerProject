package com.skilldistillery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.ExerciseSet;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Integer> {

}
