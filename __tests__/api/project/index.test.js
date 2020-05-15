import http from 'http';
import listen from 'test-listen';
import { apiResolver } from 'next-server/dist/server/api-utils';
import fetch from 'isomorphic-unfetch';
import IndexProjectHandler from '../../../pages/api/project/index';

const project1 = {
  name: 'Project1',
  description: 'This is the description for project 1.'
};
const userSession1 = {
  id: '5ebd9350a20b7c2becfcac4c',
  email: 'testuser@example.com'
};

describe('Creating a project', () => {
  it('POST /api/project 200 success', async () => {
    expect.assertions(3);
    const requestHandler = (req, res) => {
      req.session = {
        user: userSession1
      };
      return apiResolver(req, res, undefined, IndexProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(project1),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect({ name: data.name, description: data.description }).toEqual(project1);
    return server.close();
  });
  it('POST /api/project 400 bad-request', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = {
        user: userSession1
      };
      return apiResolver(req, res, undefined, IndexProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        name: 'test name'
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });
  it('POST /api/project 401 auth-error', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => apiResolver(req, res, undefined, IndexProjectHandler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(project1),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(401);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });
});
