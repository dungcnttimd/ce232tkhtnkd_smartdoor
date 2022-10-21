// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const app = express()
// // var io = require("socket.io")(server)
// var fs = require('fs');
// var mqtt = require('mqtt')
// const user = require('./routers/user')
// const mapTest = require("./models/mapTest")
// const aa = "sdsdd"
// //const config = require("config")
// //const dbConfig = config.get("Cluster0.dbConfig.dbName")
// const markers = []
// const authUser = require('./routers/auth')
// //const authUser = require('./routers/auth')(aa)
// const path = require("path")
// const cookieParser = require('cookie-parser')
//  const PORT = process.env.PORT ||  3001
// const mongoose = require('mongoose');
//const URI = 'mongodb://localhost:27017/testdb'
// const URI = 'mongodb+srv://ngomandat234:0939339964dat@cluster0.acui9.mongodb.net/?retryWrites=true&w=majority'
// // const options = {
// //   key: fs.readFileSync("C:/Users/lemin/key.pem"),
// //   cert: fs.readFileSync('C:/Users/lemin/cert.pem')
// // }; 
// // var server = require("https").Server(options,app)
// var server = require("http").Server(app)
// mongoose
// //.connect(URI, {dbConfig,useNewUrlParser:true, useUnifiedTopology:true})
// .connect(URI, {useNewUrlParser:true, useUnifiedTopology:true})
// .then(()=>{
//     console.log("Connect to db")
//     //InitRole()
//     server.listen(PORT,()=>{
//         console.log(`Server is listening on port ${PORT}`)
//     })
// }).catch((err) => {
//     console.log(err)
// })
// const io = require("socket.io")(server);
// var options = {
//     username: "ZKgWFER5h0Ymc9NL4rqkNtNgWFScfLb5mhPPJxKQly1nvEYpVcyxubBgGjgLVhG5",
//     password: "",
//     clientId: "Node-client"
//   }
//   var client = mqtt.connect('mqtt://mqtt.flespi.io:1883', options)
  
//   client.on('connect', function () {
//     client.subscribe('data/#', function (err) {
//       if (!err) {
//         client.publish('data/as/', 'Hello mqtt')
//       }
//     })
//   })
//   client.on('close',function(){
//     console.log("connection closed")
//   })
//   client.on('message', function (topic, message) {
//     // message is Buffer
//   //  console.log(topic.toString())
//    // console.log(message.toString())
//     if(topic.toString() === "data/map"){
//       var data = JSON.parse(message.toString());
//      // console.log(data)
//       var map = new mapTest({
//         longtitude :  data.longtitude,
//         latitude : data.latitude
//       })
//       console.log(map + "map ne")
//       io.emit("newMapData", JSON.stringify(map));
//       map.save((err) => {
//         if(!err)
//           console.log("save!!")
//         else
//           console.log("error")
//       })
//     }
//     //   client.end()
//   })

//   io.on('connection', client => {
//     // mapTest.find().limit(5).then((data)=>{
//     //     io.emit("firstConnect", data)
//     // })
//     console.log("connect socketio")
     
//     client.on('disconnect', () => { console.log("client connect: " + client.id) });
//   });

// io.on("connection", socket =>{
//     for(let i=0; i < markers.length; i++){
//         socket.emit("marker", markers[i])
//     }
//     // socket.on("markerr",data=>{
//     //     markers.push(data)
//     //     socket.emit("marker",data)
//     // })
// })
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true, limit:"30mb" }))
// app.use("/static", express.static('./static'));
// //app.use(cors())
// app.use(cors({
//   origin: '*',
//   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
// }));
// app.use('/user',user)
// app.use('/auth',authUser)
// app.use(cookieParser())
// app.engine('hbs', handlebars({
//     extname : '.hbs',
//     helpers: {
//         sum: (a,b) => a+b
//     }
// }));
// app.use('/',express.static(path.join(__dirname, 'public')));
// app.use('/user',express.static(path.join(__dirname, 'public')));
// app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs')
// const db = require("./models");
// const Role = db.roleUser;
// function InitRole() {
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
//           console.log("added 'user' to roles collection");
//         });
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }

// server stream
const NodeMediaServer = require('node-media-server');
const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    // chunk_size: 60000,
    chung_size:4096,
    //gop_cache: true,
    gop_cache: false,
    //ping: 30,
    ping: 1,
    ping_timeout: 1
    //ping_timeout: 60
  },
  http: {
    port: 3000,
    mediaroot: './media',
    allow_origin: '*',
    api: true,
    webroot: './www',
  },
  trans: {
    ffmpeg: 'C:/ProgramData/chocolatey/bin/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run()


nms.on('preConnect', (id, args) => {
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
    // const file = fs.createWriteStream("video.mp4");
    // const request = http.get('http://localhost:3000/live/STREAM_NAME.flv', function(response) {
    //    response.pipe(file);
    //    // after download completed close filestream
    //    file.on("finish", () => {
    //        file.close();
    //        console.log("Download Completed");
    //    });
    // });
  });
  
  nms.on('postConnect', (id, args) => {
    console.log('[NodeEvent on postConnect1]', `id=${id} args=${JSON.stringify(args)}`);
    
  });
  
  nms.on('doneConnect', (id, args) => {
    console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
   
  });
  
  nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish2]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
  });
  
  nms.on('postPublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPublish3]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // setInterval(function(){
     
    //   console.log("sau 15 ne")
    // }, 15000);
    
  nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });
  
  nms.on('prePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
  });
  
  nms.on('postPlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    
  });
  
  nms.on('donePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });
})