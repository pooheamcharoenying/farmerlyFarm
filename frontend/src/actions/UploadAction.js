import AWS from 'aws-sdk';


const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const S3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: "RQCZPP26IBCSMVIKVVDX",
      secretAccessKey: "6MKKW0aMCBtX66laRDLcRkbXGk5tTwPc30mICrxz2/E"
    });

   
      

function UploadAction(file) {
        return new Promise(function(resolve, reject) {
            const params = { Body: file, 
                Bucket: "studysabaiapp", 
                Key: file.name};
        // Sending the file to the Spaces
        S3.putObject(params)
        .on('build', request => {
        request.httpRequest.headers.Host = "https://studysabaiapp.sgp1.digitaloceanspaces.com";
        request.httpRequest.headers['Content-Length'] = file.size;
        request.httpRequest.headers['Content-Type'] = file.type;
        request.httpRequest.headers['x-amz-acl'] = 'public-read';
        }).on('httpUploadProgress',function(progress) {
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          })
        .send((err,data) => {
        if (err) reject(err);
        else {
        // If there is no error updating the editor with the imageUrl
        // const imageUrl = `${Config.digitalOceanSpaces}` + blob.name
        // callback(imageUrl, blob.name)
        resolve(`https://studysabaiapp.sgp1.digitaloceanspaces.com/${file.name}`)

        }
        })
        });
      }

  
  

export {UploadAction}