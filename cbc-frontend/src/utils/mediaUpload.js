import { createClient } from '@supabase/supabase-js';

const url = "https://syeyjnzatzoamfgqmwfk.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZXlqbnphdHpvYW1mZ3Ftd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDIxMzcsImV4cCI6MjA5MjYxODEzN30.lOuklD4LwwZEZOs_5IkQUAZHWF2YrtxZ8QLS7o9MwCI";



const supabase = createClient(url,key);


export default function uploadMediaToSupabase(file) {
    return new Promise(async (resolve, reject) => {
        if (!file) {
            reject("Please select a file to upload.");
        
        }


        let fileName = file.name;
        const extension = fileName.split(".").pop().toLowerCase();
        
                // if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
                //     alert("Please select a valid image file (jpg, jpeg, png).");
                //     return;
                // }
        
        
        
        const timestamp = new Date().getTime();
        
        fileName = timestamp +file.name+ "." + extension;
        
        supabase.storage.from("images").upload(fileName, file,
        {   cacheControl: "3600",
            upsert: false
        }).then((res) => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch((error) => {
            reject(error);
        }                          
        
        )
    });
}