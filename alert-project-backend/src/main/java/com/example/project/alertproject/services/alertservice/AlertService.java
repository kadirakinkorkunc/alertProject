package com.example.project.alertproject.services.alertservice;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.domain.AlertHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;

import java.util.Collection;
import java.util.List;

public interface AlertService {
    List<Alert> listAll(int offset,int limit);
    List<Alert> listAll();
    Alert getById(int id);
    void addOrSave(Alert alertObject);
    String deleteById(int id);
    Boolean isExistsById(int id);
    int getAlertListSize();

}
