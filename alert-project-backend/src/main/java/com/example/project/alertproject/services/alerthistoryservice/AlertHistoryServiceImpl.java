package com.example.project.alertproject.services.alerthistoryservice;

import com.example.project.alertproject.domain.AlertHistory;
import com.example.project.alertproject.repositories.AlertHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertHistoryServiceImpl implements  AlertHistoryService {

    private AlertHistoryRepository alertHistoryRepository;

    public AlertHistoryServiceImpl(AlertHistoryRepository alertHistoryRepository) {
        this.alertHistoryRepository = alertHistoryRepository;
    }

    @Override
    public AlertHistory getById(int id) {
        return alertHistoryRepository.findById(id).get();
    }

    @Override
    public List<AlertHistory> listAll() {
        return alertHistoryRepository.findAll();
    }

    @Override
    public void addOrSave(AlertHistory alertHistoryObject) {
        alertHistoryRepository.save(alertHistoryObject);
    }

}
