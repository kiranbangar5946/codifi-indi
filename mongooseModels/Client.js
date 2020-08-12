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
            type: String,
            required: true
        },
        total_bill: {
            type: Number,
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

clientSchema.index({ total_bill: -1 }, { background: true })
module.exports = mongoose.model("Client", clientSchema);
