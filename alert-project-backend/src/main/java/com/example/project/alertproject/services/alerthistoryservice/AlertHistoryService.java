package com.example.project.alertproject.services.alerthistoryservice;
import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.domain.AlertHistory;

import java.util.List;

public interface AlertHistoryService {
    AlertHistory getById(int id);
    List<AlertHistory> listAll();
    void addOrSave(AlertHistory alertHistoryObject);


}
