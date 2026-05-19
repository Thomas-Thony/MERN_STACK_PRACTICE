const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Utilisateur'
        },
        titre: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        termine: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
);

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    stat_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)