package com.example.project.alertproject.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerthistories")
public class AlertHistory  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alertId;

//    @Column(name = "alert_time")
//    private long alertTime;

    @Column(name = "alert_time")
    private String alertTime;

    @Column(name = "alert_latency")
    private Long alertLatency;

    @Column(name = "alert_state")
    private int success;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "req_id", nullable = false)
    @OrderBy("reqId")
    private Alert alertObject;

    public Long getAlertLatency() {
        return alertLatency;
    }

    public void setAlertLatency(Long alertLatency) {
        this.alertLatency = alertLatency;
    }

    public int getAlertId() {
        return alertId;
    }

    public void setAlertId(int alertId) {
        this.alertId = alertId;
    }

    public String getAlertTime() {
        return alertTime;
    }

    public void setAlertTime(String alertTime) {
        this.alertTime = alertTime;
    }

    //    public long getAlertTime() {
//        return alertTime;
//    }
//
//    public void setAlertTime(long alertTime) {
//        this.alertTime = alertTime;
//    }

    public int getSuccess() {
        return success;
    }

    public void setSuccess(int success) {
        this.success = success;
    }

    public Alert getAlertObject() {
        return alertObject;
    }

    public void setAlertObject(Alert alertObject) {
        this.alertObject = alertObject;
    }
}
