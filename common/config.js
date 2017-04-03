'use strict';

let config = {
    
     APP_PATH: `/home/upadhyayula/Workbench/Office/mobile`,

     SOURCE:`source`,
     
     DESTINATION:`www-dev`,
     
     DESTINATION_PROD:`www-prod`,
     
     DESTINATION_rel: `www`,
   
     MOBILE_CONFIG:{

       name:`test`,
       
       description:`test`,
       
       author:`TCS team`,
       
       author_email:`pavankumar.upadhyayula@tcs.com`,
       
       author_href:`http://tcs.com`,
       
       content:`index.html`,
       
       plugin:[`cordova-plugin-whitelist`],
       
       access_origin:`*`,
       
       allow_intent:[`http://*/*`,`https://*/*`,`tel:*`,`sms:*`,`mailto:*`,`geo:*`],
       
       platform:[`android`],

       android_allow_intent:`market:*`
       
       }



     }


module.exports = config;