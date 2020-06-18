package com.example.project.alertproject.services.scheduleservice;

import com.example.project.alertproject.domain.Alert;
import com.example.project.alertproject.services.alerthistoryservice.AlertHistoryService;
import com.example.project.alertproject.services.alertservice.AlertService;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;


@Service
public class ScheduleService {
    AlertHistoryService alertHistoryService;
    AlertService alertService;
    public ScheduleService(AlertHistoryService alertHistoryService, AlertService alertService) {
        this.alertHistoryService = alertHistoryService;
        this.alertService = alertService;
    }



    public int scheduleFixedDelayTask(Alert alert) {
        HttpMethod methodType = HttpMethod.GET;

        if (alert.getReqType().equals("GET")){
            methodType = HttpMethod.GET;
        }else if(alert.getReqType().equals("POST")){
            methodType = HttpMethod.POST;
        }else{methodType = HttpMethod.DELETE;}

        //RestTemplate restTemplate = new RestTemplate();

        try {
            URL reqURL = new URL("http://"+ alert.getReqUrl());
            HttpURLConnection result =  (HttpURLConnection) reqURL.openConnection();
            result.setRequestMethod(alert.getReqType());
            int statusCode = result.getResponseCode();

            System.out.println(alert.getReqName()+"->"+LocalDateTime.now()+":" +alert.getReqUrl()+":"+statusCode);
            return statusCode;
            /* REST TEMPLATE SOLUTION
            ResponseEntity<String> result =
                    restTemplate.exchange("http://" + alert.getReqUrl(),
                            methodType, null, String.class);
                            int statusCode = result.getStatusCode().value();
                            System.out.println(alert.getReqName()+":"+statusCode);
                            return statusCode;

               REST TEMPLATE SOLUTION */
        } catch(Exception exception){
           System.out.println("hata:" + exception.getMessage());
           return 0;
        }
        // HttpMethodException.MethodNotAllowed exception şeklinde tüm
            // statusları handle etmen gerek ilerisi için.
    }

}
