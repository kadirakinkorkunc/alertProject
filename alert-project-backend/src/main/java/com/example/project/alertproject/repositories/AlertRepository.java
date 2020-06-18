package com.example.project.alertproject.repositories;

import com.example.project.alertproject.domain.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert,Integer> {
}
