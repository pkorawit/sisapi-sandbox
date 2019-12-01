const soap = require('soap');
const config = require('./config.json');
const whitelist = require('./sandbox.json').whitelist;

async function authenticate(username, password) {
    
    const allow = whitelist.includes(username);
    if (allow == false) {
        throw new Error("Permission denined");
    }

    if(allow){
        var url = config.psuPassport.authentication.wsdl;
        var args = {
            username: username,
            password: password
        };
        
        const client = await soap.createClientAsync(url);
        const output = await client.AuthenticateAsync(args);
        console.log(output);        
        return output[0].AuthenticateResult;
    }

    return true;

}

module.exports = {
    authenticate
};