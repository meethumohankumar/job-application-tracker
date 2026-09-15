package com.jobtracker.jobtracker.service;

import com.jobtracker.jobtracker.model.Job;
import com.jobtracker.jobtracker.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job updateJob(Long id, Job updatedJob) {
    return jobRepository.findById(id)
            .map(job -> {
                job.setCompany(updatedJob.getCompany());
                job.setRole(updatedJob.getRole());
                job.setStatus(updatedJob.getStatus());
                job.setApplicationDate(updatedJob.getApplicationDate());
                return jobRepository.save(job);
            })
            .orElse(null);
}

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}