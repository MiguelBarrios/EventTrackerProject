package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExerciseSetTest {
	private static EntityManagerFactory emf;
	
	private EntityManager em;
	
	private ExerciseSet exerciseSet;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("Fitness");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		exerciseSet = em.find(ExerciseSet.class,1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		exerciseSet = null;
	}


	@Test
	void test_basic_exercise_mapping() {
		assertNotNull(exerciseSet);
		assertEquals(exerciseSet.getExerciseName(), "BENCH PRESS");
		assertEquals(exerciseSet.getWeight(), 135);
	}
	
}
