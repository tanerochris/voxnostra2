/* eslint no-underscore-dangle: "off" */
import mongoose, { Schema } from 'mongoose';
import ContractorSchema from './contractor.schema';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    beneficiary: {
      type: String,
      required: String
    },
    duration: {
      type: Number
    },
    period: {
      type: String,
      enum: ['days', 'weeks', 'months', 'years'],
      default: 'weeks'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    contractors: [ContractorSchema],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media'
      }
    ],
    cost: Number,
    tags: [String],
    executionPlan: String,
    status: {
      type: String,
      enum: ['none', 'awarded', 'in-progress', 'warning', 'danger', 'completed'],
      default: 'none'
    }
  },
  { timestamps: true }
);

ProjectSchema.methods.view = function view(summary = false) {
  const project = JSON.parse(JSON.stringify(this));
  project.id = project._id;
  delete project._id;
  delete project.__v;
  const { id, name, description, createdAt } = project;
  return summary
    ? {
        id,
        name,
        description,
        createdAt
      }
    : Object.assign(project, { id });
};
delete mongoose.connection.models.Project;

export default mongoose.model('Project', ProjectSchema);
