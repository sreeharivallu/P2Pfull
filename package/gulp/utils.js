'use strict';
const config = require('../../common/config');
const MOBILE_CONFIG = config.MOBILE_CONFIG;

//console.log("mob --- ",MOBILE_CONFIG);

/**
 *
 *
 **/

let _generateXML = (app_name) => {
   
     let xml = `<?xml version='1.0' encoding='utf-8'?>
                <widget id="org.tcs.icici" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
                <name>${app_name}</name>
                <description>${MOBILE_CONFIG.description}</description>
                <author email="${MOBILE_CONFIG.author_email}" href="${MOBILE_CONFIG.author_href}">${MOBILE_CONFIG.author}</author>
                <content src="${MOBILE_CONFIG.content}"></content>
                <access origin="${MOBILE_CONFIG.access_origin}" />`;
                
                for(let i in MOBILE_CONFIG.plugin){
                	xml += `<plugin name="${MOBILE_CONFIG.plugin}" spec="${parseInt(i) + 1}" />`
                }
                
                for(let i in MOBILE_CONFIG.allow_intent){
                     xml += `<allow-intent href="${MOBILE_CONFIG.allow_intent[i]}"/>`;
                }; 
                
                for(let i in MOBILE_CONFIG.platform){
                     xml += `<platform name="${MOBILE_CONFIG.platform[i]}">
                                      <allow-intent href="${MOBILE_CONFIG.android_allow_intent}" />
                             </platform>`;
                }; 

          xml += `</widget>`;

    return xml;
}

module.exports.mobile_config_xml = _generateXML;