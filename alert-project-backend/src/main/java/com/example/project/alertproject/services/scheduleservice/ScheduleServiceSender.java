package com.example.project.alertproject.services.scheduleservice;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.domain.AlertHistory;
import com.example.project.alertproject.services.alerthistoryservice.AlertHistoryService;
import com.example.project.alertproject.services.alertservice.AlertService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;

@Component
public class ScheduleServiceSender {
    AlertService alertService;
    AlertHistoryService alertHistoryService;
    ScheduleService scheduleService;
    public ScheduleServiceSender( ScheduleService scheduleService,AlertService alertService, AlertHistoryService alertHistoryService) {
        this.alertService = alertService;
        this.alertHistoryService = alertHistoryService;
        this.scheduleService =  scheduleService;

    }

    @Async
    @Scheduled(fixedDelay = 1000)
    public void timeControl(){ // timer classı kullanmadan fixedDelay'ı getControlTime'a ayarlayabilecek miyim?
        List<Alert> alertList = alertService.listAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss"); // for date format
        if (alertList.size() == 0){
            System.out.println("liste boş");
        }
        else{
            for (Alert alert :alertList) {
                if (alert.getReqHistory().isEmpty()){
                    LocalDateTime now = LocalDateTime.now();
                    int statusCode =  scheduleService.scheduleFixedDelayTask(alert);
                    LocalDateTime later = LocalDateTime.now();
                    long latency = ChronoUnit.MILLIS.between(now,later);
                    System.out.println(latency);
                    String reqTime = now.format(formatter);

                    AlertHistory newAlertHistory = new AlertHistory();
                    newAlertHistory.setAlertTime(reqTime);
                    if (statusCode == 200){
                      newAlertHistory.setSuccess(200); // 200 success
                    }
                    else {
                        newAlertHistory.setSuccess(100); //100 fail
                    }
                    newAlertHistory.setAlertLatency(latency);
                    alert.getReqHistory().add(newAlertHistory);
                    newAlertHistory.setAlertObject(alert);
                    alertService.addOrSave(alert);
                }
                else{
                    if (alert.getReqLeftPeriod() == 1){
                        LocalDateTime now = LocalDateTime.now();
                        int statusCode =  scheduleService.scheduleFixedDelayTask(alert);
                        LocalDateTime later = LocalDateTime.now();
                        long latency = ChronoUnit.MILLIS.between(now,later);
                        System.out.println(latency);

                        AlertHistory newAlertHistory = new AlertHistory();
                        newAlertHistory.setAlertTime(now.format(formatter));

                        if (statusCode == 200){
                            newAlertHistory.setSuccess(200);
                        }
                        else{
                            newAlertHistory.setSuccess(100);
                        }
                        newAlertHistory.setAlertLatency(latency);
                        alert.getReqHistory().add(newAlertHistory);
                        newAlertHistory.setAlertObject(alert);

                        alert.setReqLeftPeriod(alert.getReqControlTime()); // reqLeft 0 oldugu icin
                        alertService.addOrSave(alert);
                    }else{
                        alert.setReqLeftPeriod(alert.getReqLeftPeriod()-1);
                        alertService.addOrSave(alert);
                    }


               }
            }
        }

    }
}
