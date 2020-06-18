import PropTypes from 'prop-types';

const ProjectCard = (props) => {
  return (
    <div className="project-list-item">
      <div className="project-title">
        <a href={`/project/${props.id}`}>
          <h3>
            <span className="title">{props.name}</span>&nbsp;&nbsp;&nbsp;
            <span className="verified">
              <object type="image/svg+xml" data="/assets/svg/verified-badge.svg" width="18" height="18"></object>
            </span>
          </h3>
          <h6 className="subtitle">
            <span>Created by: {props.createdBy ? props.createdBy.name : ''}</span>&nbsp;&nbsp;
            <span>{props.createdAt}</span>&nbsp;&nbsp;
            <span>Budget curr: {props.currency}</span>
          </h6>
        </a>
      </div>
      <div className="project-description">
        <p>{props.description}</p>
      </div>
      <div className="project-footer">
        <div className="sub-1">
          <div>
            <span className="icon">
              <object type="image/svg+xml" data="/assets/svg/clock.svg" width="15" height="15"></object>
            </span>
            &nbsp;
            <span className="sub-value">
              {props.duration}
              {props.period}
            </span>
          </div>
          <div>
            <span className="icon">
              <object type="image/svg+xml" data="/assets/svg/cash.svg" width="18" height="18"></object>
            </span>
            &nbsp;
            <span className="sub-value">{props.cost}</span>
          </div>
          <div>
            <span className="icon">
              <object type="image/svg+xml" data="/assets/svg/comments.svg" width="18" height="18"></object>
            </span>
            &nbsp;
            <span className="sub-value">{props.comments}</span>
          </div>
        </div>
        <div className="sub-2">
          <div>
            <span className="sub-value">Status: {props.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
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
  cost: PropTypes.number
};

export default ProjectCard;
