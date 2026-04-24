import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const url = "https://syeyjnzatzoamfgqmwfk.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZXlqbnphdHpvYW1mZ3Ftd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDIxMzcsImV4cCI6MjA5MjYxODEzN30.lOuklD4LwwZEZOs_5IkQUAZHWF2YrtxZ8QLS7o9MwCI";


export default function FileUploadTest() {
    const [file, setFile] = useState(null);

    function handleFileUpload() {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        console.log(file);

        const fileName = file.name;
        const extension = fileName.split(".").length-1;

        const supabase = createClient(url,key)

        supabase.storage.from("images").upload(file.name, file),
        {   cacheControl: "3600",
            upsert: false
        }
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