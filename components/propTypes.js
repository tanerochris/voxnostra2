import PropTypes from 'prop-types';

export const SessionUserType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string
});

export const ProjectType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  createdBy: PropTypes.object,
  createdAt: PropTypes.string,
  duration: PropTypes.number,
  period: PropTypes.string,
  description: PropTypes.string,
  comments: PropTypes.number,
  status: PropTypes.string,
  currency: PropTypes.string,
  cost: PropTypes.number,
  beneficiary: PropTypes.string,
  executionPlan: PropTypes.string,
  tags: PropTypes.array
});
