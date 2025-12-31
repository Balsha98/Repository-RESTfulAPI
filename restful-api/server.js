"use strict";

// Imported modules.
const express = require("express");
const ServiceLayer = require("./assets/layers/serviceLayer");

// Module objects.
const server = express();
const sLayer = new ServiceLayer();

// Environment variables.
const root = "/CompanyServices";
const portNum = process.env.PORT || 8080;
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// ***** COMPANY ***** //

server.delete(`${root}/company`, (request, response) => {
    sLayer.deleteCompany(request.query.compName).then((message) => response.send(message));
});

// ***** DEPARTMENT ***** //

server.get(`${root}/department`, (request, response) => {
    const { deptID, compName } = request.query;
    sLayer.getDepartment(deptID, compName).then((result) => response.send(result));
});

server.get(`${root}/departments`, (request, response) => {
    sLayer.getAllDepartments(request.query.compName).then((result) => response.send(result));
});

server.post(`${root}/department`, (request, response) => {
    sLayer.insertDepartment(request.body).then((result) => response.send(result));
});

server.put(`${root}/department`, (request, response) => {
    sLayer.updateDepartment(request.body.dept).then((result) => response.send(result));
});

server.delete(`${root}/department/`, (request, response) => {
    const { deptID, compName } = request.query;
    sLayer.deleteDepartment(deptID, compName).then((result) => response.send(result));
});

// ***** EMPLOYEE ***** //

server.get(`${root}/employee`, (request, response) => {
    sLayer.getEmployee(request.query.empID).then((result) => response.send(result));
});

server.get(`${root}/employees`, (request, response) => {
    sLayer.getAllEmployees(request.query.compName).then((result) => response.send(result));
});

server.post(`${root}/employee`, (request, response) => {
    sLayer.insertEmployee(request.body).then((result) => response.send(result));
});

server.put(`${root}/employee`, (request, response) => {
    sLayer.updateEmployee(request.body.emp).then((result) => response.send(result));
});

server.delete(`${root}/employee`, (request, response) => {
    sLayer.deleteEmployee(request.query.empID).then((result) => response.send(result));
});

// ***** TIMECARD ***** //

server.get(`${root}/timecard`, (request, response) => {
    sLayer.getTimecard(request.query.cardID).then((result) => response.send(result));
});

server.get(`${root}/timecards`, (request, response) => {
    sLayer.getAllTimecards(request.query.empID).then((result) => response.send(result));
});

server.post(`${root}/timecard`, (request, response) => {
    sLayer.insertTimecard(request.body).then((result) => response.send(result));
});

server.put(`${root}/timecard`, (request, response) => {
    sLayer.updateTimecard(request.body.card).then((result) => response.send(result));
});

server.delete(`${root}/timecard`, (request, response) => {
    sLayer.deleteTimecard(request.query.cardID).then((result) => response.send(result));
});

// ***** LISTENER ***** //

server.listen(portNum, () => console.log(`Server running on port ${portNum}...`));
