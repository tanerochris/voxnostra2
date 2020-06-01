import jwt from 'jsonwebtoken';
import moment from 'moment';
import path from 'path';
import PropertiesReader from 'properties-reader';
import { AuthorizationError } from './api-errors';

const properties = PropertiesReader(path.resolve('voxnostra.properties'));

export const SALT_WORK_FACTOR = Number(properties.get('auth.SALT_WORK_FACTOR') || 10);

export const PWD_MAX_LOGIN_ATTEMPTS = Number(properties.get('auth.PWD_MAX_LOGIN_ATTEMPTS') || 10);
export const PWD_LOCK_TIME = moment.duration({ minute: Number(properties.get('auth.PWD_LOCK_TIME') || 5) });

export const PWD_RESET_TOKEN_EXP = moment.duration({ hours: Number(properties.get('auth.PWD_RESET_TOKEN_EXP') || 5) });
export const JWT_SECRET = properties.get('auth.JWT_SECRET') || 'XYZ';
export const JWT_ISSUER = properties.get('auth.JWT_ISSUER') || 'xyz';

/**
 * Verify reset token and returns the payload
 *
 * @param {string} token
 * @returns {Promise<{ valid: boolean, payload: PasswordResetTokenPayload, err: any }>}
 */
export function verifyResetToken(token) {
  return new Promise((resolve) =>
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return resolve({ err, valid: false });
      }

      return resolve({ payload, valid: true });
    })
  );
}

/**
 * Set use session, automatically submitted to db by next-session
 * @typedef {Object} UserSession
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @param req
 * @param {{ id: string, email: string, name: string }} user
 */
export function setUserSession(req, user) {
  if (user) {
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }
}

/**
 * Check if current user exist, and is authenticated
 *
 * @param req
 * @param {boolean=} shouldError - If no current user, throw Authorization Error
 */
export function isAuthenticated(req, shouldError) {
  const authenticated = !!(req.session.user && req.session.user.id);

  if (!authenticated && shouldError) {
    throw new AuthorizationError();
  }

  return authenticated;
}
