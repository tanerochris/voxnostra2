/* eslint no-underscore-dangle: "off" */
const mongoose = require('mongoose');
const ContractorSchema = require('./contractor.schema');

const Schema = mongoose.Schema;
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
      required: true
    },
    duration: {
      type: Number
    },
    period: {
      type: String,
      enum: ['wks', 'mon', 'yrs'],
      default: 'mon',
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    contractors: [ContractorSchema],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media'
      }
    ],
    currency: {
      type: String,
      default: 'XAF'
    },
    comments: {
      type: Number,
      default: 0
    },
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
  const { id, name, description, createdAt, status } = project;
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

module.exports = mongoose.model('Project', ProjectSchema);
