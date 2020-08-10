const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        agency: {
            type: Schema.Types.ObjectId,
            ref: 'Agency',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone_number: {
            type: Number,
            required: true
        },
        total_bill: {
            type: Number,
            required: true,
            index:true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
);

module.exports = mongoose.model("Client", clientSchema);
