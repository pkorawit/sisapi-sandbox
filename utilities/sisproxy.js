const axios = require('axios');
const config = require('./config.json');
const whitelist = require('./sandbox.json').whitelist;
const baseURL = config.baseURL;


async function renewToken() {
    const targetURL = config.tokenURL;
    const option = {
        headers: {
            'username': config.authentication.username,
            'password': config.authentication.password
        }
    };
    const response = await axios.get(targetURL, option);
    return response.data;
}

async function getAccessToken(studentID){

    const token = await renewToken();
    if (!token.AccessToken) {
        throw new Error("Token renewal failed");
    }
    const allow = whitelist.includes(studentID);
    if (allow == false) {
        throw new Error("Permission denined");
    }

    return token;

}


async function getClassSchedule(studentID, eduTerm, eduYear) {

    token = await getAccessToken(studentID);     
    const targetURL = baseURL + `students/${studentID}/class-schedules/${eduYear}/${eduTerm}`;
    console.log(targetURL);
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);
        
    return response.data;
}

async function getExamSchedule(studentID, eduTerm, eduYear, examType) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/exam-schedules/${eduYear}/${eduTerm}/${examType}/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

async function getGrade(studentID) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/grades/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

async function getGPA(studentID) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/gpa/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

async function getAllEnrollment(studentID) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/enrollments/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

async function getEnrollment(studentID, eduTerm, eduYear) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/enrollments/${eduYear}/${eduTerm}/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

async function getStudentInfo(studentID) {
      
    token = await getAccessToken(studentID);   
    const targetURL = baseURL + `students/${studentID}/`;
    var option = {
        headers: { 'AccessToken': token.AccessToken }
    };
    const response = await axios.get(targetURL, option);

    return response.data;
}

module.exports = {
    getClassSchedule,
    getExamSchedule,
    getGrade,
    getGPA,
    getAllEnrollment,
    getEnrollment,
    getStudentInfo
};