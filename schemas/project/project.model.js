import mongoose, { Schema } from 'mongoose';

const ContractorSchema = new Schema(
  {
    name: String,
    link: String
  },
  {
    _id: false
  }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    beneficiary: { type: String, required: true },
    duration: String,
    contractors: [ContractorSchema],
    attachments: String,
    cost: { type: String, required: true },
    tags: [String],
    address: {
      town: String,
      country: String
    },
    executionPlan: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      default: 'none',
      enum: ['none', 'awarded', 'in-progess', 'warning', 'danger', 'completed']
    }
  },
  {
    timestamps: true
  }
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
