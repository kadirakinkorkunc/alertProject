package com.example.project.alertproject.controllers;
import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.domain.AlertHistory;
import com.example.project.alertproject.repositories.AlertRepository;
import com.example.project.alertproject.services.alerthistoryservice.AlertHistoryService;
import com.example.project.alertproject.services.alertservice.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class AlertHistoryController {


    private AlertService alertService;
    private AlertHistoryService alertHistoryService;

    public AlertHistoryController(AlertService alertService, AlertHistoryService alertHistoryService) {
        this.alertService = alertService;
        this.alertHistoryService = alertHistoryService;
    }

    @GetMapping("/alerts/{alert_id}/history")
    public Set<AlertHistory> getContactByStudentId(@PathVariable int alert_id){
            Alert a = alertService.getById(alert_id);
        return a.getReqHistory();
    }

    @GetMapping("/alerts/alertshistory")
    public List<AlertHistory> getAlertHistories(){
        return alertHistoryService.listAll();
    }



    @PostMapping("/alerts/{id}/history")
    public void addAlertHistory(@PathVariable int id,
                                                 @Valid @RequestBody AlertHistory alertHistory) {
        Alert a = alertService.getById(id);
        a.getReqHistory().add(alertHistory);
        alertHistory.setAlertObject(a);
        alertService.addOrSave(a);
    }

}