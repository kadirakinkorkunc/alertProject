package com.example.project.alertproject.repositories;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.domain.AlertHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertHistoryRepository extends JpaRepository<AlertHistory,Integer> {


}
