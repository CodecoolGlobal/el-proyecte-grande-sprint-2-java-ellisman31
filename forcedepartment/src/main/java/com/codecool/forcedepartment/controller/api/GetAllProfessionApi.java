package com.codecool.forcedepartment.controller.api;

import com.codecool.forcedepartment.dao.DatabaseManager;
import com.codecool.forcedepartment.model.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GetAllProfessionApi {

    DatabaseManager databaseManager;

    @Autowired
    public GetAllProfessionApi(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    @RequestMapping(value = "/api/getAllProfession", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getAllProfession() {
        return databaseManager.getAllProfession();
    }

    @RequestMapping(value = "/api/getAllWorkObject", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> getAllWorkObject() {
        return databaseManager.getAllWorkObject();
    }

    @RequestMapping(value = "/api/getAllWorkerByProfession/{profession}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Worker> getAllWorkerByProfession(
            @PathVariable("profession") String profession) {
        return databaseManager.getWorkersByProfession(profession);
    }

}
