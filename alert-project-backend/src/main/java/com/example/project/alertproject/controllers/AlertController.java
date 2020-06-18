package com.example.project.alertproject.controllers;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.repositories.AlertRepository;
import com.example.project.alertproject.services.alertservice.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class AlertController {
    private AlertService alertService;
    private AlertRepository alertRepository;

    public AlertController(AlertService alertService,AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
        this.alertService = alertService;
    }

    @RequestMapping(value = "/alerts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Alert> listAlerts(@RequestParam int offset, @RequestParam int limit)
    {
        List<Alert> var = alertService.listAll(offset,limit);
        return var;

    }

    @GetMapping("/alerts/{id}")
    public Alert getAlert(@PathVariable int id){
        Alert object = alertService.getById(id);
        return object;

    }

    @GetMapping("/alerts/size")
    public int getAlertSize(){
        return alertService.getAlertListSize();

    }


    @PostMapping("/alerts")
    public String addNewAlert( @RequestBody Alert alertObject){
        if (alertService.isExistsById(alertObject.getReqId())){
            alertService.addOrSave(alertObject);
        }else{
            alertObject.setReqLeftPeriod(alertObject.getReqControlTime());
            alertService.addOrSave(alertObject);
        }
        return "basariyla eklendi!";
    }

    @DeleteMapping("/alerts/{id}")
    public String deleteAlert(@PathVariable int id){
        return alertService.deleteById(id);
    }


}
