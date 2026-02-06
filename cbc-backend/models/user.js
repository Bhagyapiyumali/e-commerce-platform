import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
    },

    firstName : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    isBlocked : {
        type : Boolean,
        default : false,
    },
    type : {
        type : String,
        default : "customer",
    },

    profilePicture : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fcustomer-icon&psig=AOvVaw2j-rNp-YAL3ykp6GaAuJLi&ust=1762255050254000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCHguft1ZADFQAAAAAdAAAAABAE",
    }
});

const User = mongoose.model("Users", userSchema);
export default User;