package com.example.project.alertproject.services.alertservice;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.repositories.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertServiceImpl implements AlertService {
    private AlertRepository alertRepository;

    public AlertServiceImpl(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @Override
    public List<Alert> listAll(int offset,int limit) {
        return alertRepository.findAll(PageRequest.of(offset,limit,Sort.by("reqId").ascending())).getContent();
        // PageRequest.of(offset,limit)
        // Sort.by(Sort.Direction.ASC, "reqId")
    }

    @Override
    public List<Alert> listAll() {
        return alertRepository.findAll();
    }

    @Override
    public Alert getById(int id) {
        return alertRepository.findById(id).get();
    }

    @Override
    public void addOrSave(Alert alertObject) {
            alertRepository.save(alertObject);
    }

    @Override
    public String deleteById(int id) {
        alertRepository.deleteById(id);
        return "ok";
        //return alertRepository.findAll();
    }

    @Override
    public Boolean isExistsById(int id) {
        if (alertRepository.findById(id).isPresent()){
            return true;
        }else{return false;}

    }

    @Override
    public int getAlertListSize() {
        return alertRepository.findAll().size();
    }
}

