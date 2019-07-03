const axios = require('axios');
const baseURL = 'https://api2.phuket.psu.ac.th/sis/';
const whitelist = require('./sandbox.json').whitelist;

async function getClassSchedule(studentID, eduTerm, eduYear) {

    console.log(whitelist);
    const allow = whitelist.includes(studentID);
    
    if(allow == false){
        throw new Error("Permission denined");
    }

    const targetURL = baseURL + `students/${studentID}/class-schedules/${eduYear}/${eduTerm}`;
    var config = {
        headers: { 'AccessToken': '63fdc611f45644ca94f2f1f982490a2b' }
    };  
    const response = await axios.get(targetURL, config);
    
    return response.data;
}

module.exports = {
    getClassSchedule
};