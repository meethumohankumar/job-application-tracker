package com.jobtracker.jobtracker.repository;

import com.jobtracker.jobtracker.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}