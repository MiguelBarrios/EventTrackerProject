package com.skilldistillery.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="exercise_set")
public class ExerciseSet {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="exercise_name")
	private String exerciseName;
	
	private double weight;
	
	private int reps;
	
	private String type;
	
	private LocalDateTime datetime;

	public ExerciseSet() {}

	public int getId() {
		return id;
	}

	public String getExerciseName() {
		return exerciseName;
	}

	public void setExerciseName(String exerciseName) {
		this.exerciseName = exerciseName;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDateTime getDatatime() {
		return datetime;
	}

	public void setDatatime(LocalDateTime datatime) {
		this.datetime = datatime;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	
	
	
	
}
