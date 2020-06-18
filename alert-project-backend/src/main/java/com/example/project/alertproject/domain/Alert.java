package com.example.project.alertproject.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reqId;
    @Column(name = "req_name")
    private String reqName;
    @Column(name = "req_type")
    private String reqType;
    @Column(name = "req_left_period")
    private int reqLeftPeriod ;
    @Column(name = "req_control_time")
    private int reqControlTime;
    @Column(name = "req_url")
    private String reqUrl;

    @JsonManagedReference
    @OneToMany(mappedBy = "alertObject", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @OrderBy("alertTime")
    private Set<AlertHistory> reqHistory;


    public Set<AlertHistory> getReqHistory() {
        return reqHistory;
    }

    public int getReqLeftPeriod() {
        return reqLeftPeriod;
    }

    public void setReqLeftPeriod(int reqLeftPeriod) {
        this.reqLeftPeriod = reqLeftPeriod;
    }

    public void setReqHistory(Set<AlertHistory> reqHistory) {
        this.reqHistory = reqHistory;
    }

    public int getReqId() {
        return reqId;
    }

    public void setReqId(int reqId) {
        this.reqId = reqId;
    }

    public String getReqName() {
        return reqName;
    }

    public void setReqName(String reqName) {
        this.reqName = reqName;
    }

    public String getReqUrl() {
        return reqUrl;
    }

    public void setReqUrl(String reqUrl) {
        this.reqUrl = reqUrl;
    }

    public String getReqType() {

        return reqType;
    }

    public void setReqType(String reqType) {
        this.reqType = reqType;
    }

    public int getReqControlTime() {
        return reqControlTime;
    }

    public void setReqControlTime(int reqControlTime) {
        this.reqControlTime = reqControlTime;
    }
}
