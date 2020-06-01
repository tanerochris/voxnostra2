import http from 'http';
import listen from 'test-listen';
import { apiResolver } from 'next-server/dist/server/api-utils';
import mongoose from 'mongoose';
import fetch from 'isomorphic-unfetch';
import ProjectHandler from '../../../pages/api/project/[project_id]';

const Project = mongoose.model('Project');
let project1 = null;
let project2 = null;
let project3 = null;
const user = {
  id: '5ebd9350a20b7c2becfcac4c',
  email: 'testuser@example.com'
};
const user2 = {
  id: '5ebd9350a20b7c2becfcac4d',
  email: 'testuser2@example.com'
};
const projectUpdate = {
  name: 'ProjectUpdate'
};

beforeAll(async () => {
  project1 = await new Project({
    name: 'Project1',
    description: 'This is a test project',
    createdBy: user.id
  }).save();

  project2 = await new Project({
    name: 'Project2',
    description: 'This is a test project',
    createdBy: user.id
  }).save();

  project3 = await new Project({
    name: 'Project3',
    description: 'This is a test project',
    createdBy: user.id
  }).save();
});

describe('Updating a project', () => {
  it('PUT /api/project/{project_id} 200 success', async () => {
    expect.assertions(3);
    const requestHandler = (req, res) => {
      req.session = { user };
      return apiResolver(req, res, { project_id: project1.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(projectUpdate),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect(data.name).toEqual(projectUpdate.name);
    return server.close();
  });

  it('PUT /api/project/{project_id} 400 bad-request', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = { user };
      return apiResolver(req, res, { project_id: project1.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    projectUpdate.name = ''; // to trigger a bad request.
    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(projectUpdate),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });

  it('PUT /api/project/{project_id} 401 auth-error', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) =>
      apiResolver(
        req,
        res,
        {
          project_id: project2.view().id
        },
        ProjectHandler
      );
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(projectUpdate),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(401);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });

  it('PUT /api/project/{project_id} 403 permission-error', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = {
        user: user2
      };
      return apiResolver(req, res, { project_id: project2.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(projectUpdate),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(403);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });
  it('PUT /api/project/{project_id} 404 not-found', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = {
        user: user2
      };
      return apiResolver(req, res, { project_id: 'justsometext' }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'put',
      body: JSON.stringify(projectUpdate),
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.status).toBe(404);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });
});

describe('Retrieving project', () => {
  it('GET /api/project/{project_id} 200 success user-authenticated', async () => {
    expect.assertions(3);
    const requestHandler = (req, res) => {
      req.session = { user };
      return apiResolver(req, res, { project_id: project3.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect(data.name).toEqual(project3.name);
    return server.close();
  });

  it('GET /api/project/{project_id} 200 success user-not-authenticated', async () => {
    expect.assertions(3);
    const requestHandler = (req, res) => apiResolver(req, res, { project_id: project3.view().id }, ProjectHandler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect(data.name).toEqual(project3.name);
    return server.close();
  });

  it('GET /api/project/{project_id} 404 not found', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => apiResolver(req, res, { project_id: 'justsometext' }, ProjectHandler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toBeTruthy();
    return server.close();
  });
});

describe('Deleteting project', () => {
  it('DELETE /api/project/{project_id} 200 success', async () => {
    expect.assertions(1);
    const requestHandler = (req, res) => {
      req.session = { user };
      return apiResolver(req, res, { project_id: project1.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'delete'
    });
    expect(response.status).toBe(200);
    return server.close();
  });

  it('DELETE /api/project/{project_id} 401 auth-error', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => apiResolver(req, res, { project_id: project2.view().id }, ProjectHandler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'delete'
    });
    expect(response.status).toBe(401);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });

  it('DELETE /api/project/{project_id} 403 permission-error', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = {
        user: user2
      };
      return apiResolver(req, res, { project_id: project2.view().id }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'delete'
    });
    expect(response.status).toBe(403);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });

  it('DELETE /api/project/{project_id} 404 not-found', async () => {
    expect.assertions(2);
    const requestHandler = (req, res) => {
      req.session = {
        user: user2
      };
      return apiResolver(req, res, { project_id: 'justsometext' }, ProjectHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url, {
      method: 'delete'
    });
    expect(response.status).toBe(404);
    const error = await response.json();
    expect(error).toBeTruthy();
    return server.close();
  });
});
