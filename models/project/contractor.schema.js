const { Schema } = require('mongoose');

const ContractorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    website: String
  },
  {
    timestamps: true
  }
);

module.exports = ContractorSchema;
