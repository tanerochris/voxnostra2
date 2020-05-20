import { Schema } from 'mongoose';

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

export default ContractorSchema;
