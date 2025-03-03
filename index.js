
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let ipData = "";


    req.on("data", (chunk) => {
      ipData += chunk.toString();
    });

    req.on("end", () => {
      
      fs.readFile("./hello.json", "utf8", (err, data) => {
        if (err) {
          res.end("Error reading file");
          return;
        }

     
        let existdata = JSON.parse(data);

        
        const newData = JSON.parse(ipData);

        
        const emailExists = existdata.some((item) => item.email === newData.email);

        if (emailExists) {
         
          res.end("Email already exists");
        } else {
          
          existdata.push(newData);
          let updatedata = JSON.stringify(existdata, null, 2);


          fs.writeFile("./hello.json", updatedata, (err) => {
            if (err) {
              res.end("Error writing file");
            } else {
              res.end("Data updated successfully");
            }
          });
        }
      });
    });
  } else {
    
    res.end("Method Not Allowed");
  }
});

server.listen(5646, () => {
  console.log("Server is running ");
});
