/**
 *
 *
 **/
'use strict';
const   gulp    =  require('gulp');
const   gsass   =  require('gulp-sass');
const   guglify =  require('gulp-uglify');
const   browserSync = require('browser-sync').create();
const   argv    =  require('yargs').argv;
const   concat  =  require('gulp-concat');
const   flatten =  require('gulp-flatten');

const   gfile = require('gulp-file');

const   config  =  require('./common/config.js');
const   utils = require('./package/gulp/utils');

const exec = require('child_process').exec;


let SOURCE_PATH       =  process.env.SOURCE || config.SOURCE;
let DESTINATION_PATH  =  process.env.DESTINATION || config.DESTINATION;

let execMode = argv.m || 'dev';

if(execMode === 'dev'){
    
    DESTINATION_PATH = process.env.DESTINATION || config.DESTINATION;

}else if(execMode === 'prod'){

    DESTINATION_PATH = process.env.DESTINATION || config.DESTINATION_PROD;

}else if(execMode === 'rel'){

    DESTINATION_PATH = process.env.DESTINATION || config.DESTINATION_rel;

}

//console.log(`${SOURCE_PATH}`);

/*
 * @method: sass, jscopy, htmlcopy ,
            gulp-watch, gult-dest, gulp-src, gulp-task
 * @task:   generate build for dev
 * @author: pavankumar upadhyayula
 */


 let jscopy = () => {

         let _SPath =  [SOURCE_PATH + '/js/**/*.js',
                        'bower_components/**/*.min.js',
                       '!*.gzip','!*.map','!jquery.*'];
         let _DPath =  DESTINATION_PATH + '/js';


         return gulp.src(_SPath)
                .pipe(flatten())
                .pipe(gulp.dest(_DPath));
 }

gulp.task('jscopy', jscopy);

 let htmlcopy = () => {

         let _SPath =  SOURCE_PATH + '/**/*.html';
         let _DPath =  DESTINATION_PATH + '/';

         return gulp.src(_SPath)
                .pipe(gulp.dest(_DPath));
 }


gulp.task('htmlcopy', htmlcopy);


let jscontact = () => {

        let _SPath =  ['bower_components/**/*.min.js',
                       '!*.gzip','!*.map',
                       SOURCE_PATH + '/**/*.js'
                      ];
        let _DPath =  DESTINATION_PATH + '/dist';

        return gulp.src(_SPath)
                .pipe(concat('script.js',{newLine: ';'}))
                .pipe(gulp.dest(_DPath))
}

gulp.task('jscontact', jscontact);

let sasscontact = () => {

        let _SPath =  SOURCE_PATH + '/**/*.scss';
        let _DPath =  DESTINATION_PATH + '/css';

        return gulp.src(_SPath)
                .pipe(gsass({outputStyle: 'compressed'}).on('error', gsass.logError))
                .pipe(concat('styles.css'))
                .pipe(gulp.dest(_DPath))
}

gulp.task('sasscontact', sasscontact);

let buildhtmlcopy = () => {

        let _SPath =  [SOURCE_PATH + '/**/*.html',
                       '!'+SOURCE_PATH+'/index.html', 'common/html/index.html'];
        let _DPath =  DESTINATION_PATH + '/';

        return gulp.src(_SPath)
               .pipe(gulp.dest(_DPath));
}


gulp.task('buildhtmlcopy', buildhtmlcopy);

let xmlcopy = () => {

        let _SPath = config.APP_PATH + '/common/mobile/config.xml';
        let _DPath = config.APP_PATH + '/mobile_build/cordova/';

        return gulp.src(_SPath)
        .pipe(gfile('config.xml', utils.mobile_config_xml(argv.a)))
        .pipe(gulp.dest(_DPath))
}


gulp.task('xmlcopy', xmlcopy);

let wwwcopy = () => {

        let _SPath =  DESTINATION_PATH+'/**';
        let _DPath =  config.APP_PATH + '/mobile_build/cordova/www';


        return gulp.src(_SPath)
               .pipe(gulp.dest(_DPath));
}


gulp.task('wwwcopy', wwwcopy);




/**
 *
 *
 **/

if(process.argv[2] == 'server' && argv.m != undefined){

gulp.task('dev',['sasscontact', 'jscopy', 'htmlcopy'], ()=>{
  console.log(`Development files are copied to ${DESTINATION_PATH}`);
});


gulp.task('prod',['jscontact', 'buildhtmlcopy', 'sasscontact'],() => {
   console.log(`Production files are copied to ${DESTINATION_PATH}`);
});


let deploy = argv.m == 'prod' ? 'prod':'dev' ;
gulp.task('server', [deploy], ()=>{
  browserSync.init({
      server: `${config.APP_PATH}/${DESTINATION_PATH}`
  });

   gulp.watch( SOURCE_PATH + '/scss/**/*.scss', ['sasscontact']).on('change', browserSync.reload);
   gulp.watch( SOURCE_PATH + '/js/**/*.js', ['jscopy']).on('change', browserSync.reload);
   gulp.watch( SOURCE_PATH + '/**/*.html', ['htmlcopy']).on('change', browserSync.reload);
});

}else if(process.argv[2] == 'build' && (argv.m != undefined && argv.a != undefined)){

  DESTINATION_PATH = config.DESTINATION_rel;

  console.log(`${argv.a}`);
  
  console.log(config.MOBILE_XML);


  gulp.task('dev',['sasscontact', 'jscopy', 'htmlcopy'], ()=>{
  console.log(`Development files are copied to ${DESTINATION_PATH}`);
  });


  gulp.task('prod',['jscontact', 'buildhtmlcopy', 'sasscontact'],() => {
  console.log(`Production files are copied to ${DESTINATION_PATH}`);
  });

  gulp.task('rel',['wwwcopy'],()=>{
    exec('cordova build', function(error, stdout, stderr) {
  // command output is in stdout

});
  });
  let deploy = argv.m == 'prod' ? 'prod':'dev' ;
   gulp.task('build', [deploy, 'xmlcopy'], ()=>{ console.log('Bulided completed') 
             gulp.start('rel');
   });

}else{

  console.error('error');
}
