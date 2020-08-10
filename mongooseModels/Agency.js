const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address_one: {
            type: String,
            required: true
        },
        address_two: {
            type: String,
        },
        phone_number: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
);

module.exports = mongoose.model("Agency", agencySchema);
