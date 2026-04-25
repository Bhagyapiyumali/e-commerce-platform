import React, { useState } from 'react';
import uploadMediaToSupabase from './utils/mediaUpload';


export default function FileUploadTest() {
    const [file, setFile] = useState(null);

    async function handleFileUpload() {

        uploadMediaToSupabase(file).then((url) => {
            console.log(url);
        }).catch((error) => {
            console.log(error);
        });
        // if (!file) {
        //     alert("Please select a file to upload.");
        //     return;
        // }
        

        // let fileName = file.name;
        // const extension = fileName.split(".").pop().toLowerCase();

        // if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        //     alert("Please select a valid image file (jpg, jpeg, png).");
        //     return;
        // }

        // const supabase = createClient(url,key)

        // const timestamp = new Date().getTime();

        // fileName = timestamp + "." + extension;

        // await supabase.storage.from("images").upload(fileName, file,
        // {   cacheControl: "3600",
        //     upsert: false
        // }).then((res) => {
        //     console.log(res);
        // })

        // const url2 = supabase.storage.from("images").getPublicUrl(fileName)
        // console.log(url2);
    }
    
    return (
        <div>
            <h1>File Upload Test</h1>
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            }} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
}