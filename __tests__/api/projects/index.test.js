import http from 'http';
import listen from 'test-listen';
import { apiResolver } from 'next-server/dist/server/api-utils';
import mongoose from 'mongoose';
import fetch from 'isomorphic-unfetch';
import ProjectsHandler from '../../../pages/api/projects/index';

const Project = mongoose.model('Project');
const user = {
  id: '5ebd9350a20b7c2becfcac4c',
  email: 'testuser@example.com'
};

beforeAll(() => {
  const project1 = new Project({
    name: 'Project1',
    description: 'This is a test project',
    beneficiary: 'Cameroon',
    createdBy: user.id
  });
  project1.save();
  const project2 = new Project({
    name: 'Project2',
    description: 'This is a test project',
    beneficiary: 'Cameroon',
    createdBy: user.id
  });
  project2.save();

  const project3 = new Project({
    name: 'Project3',
    description: 'This is a test project',
    beneficiary: 'Cameroon',
    createdBy: user.id
  });
  project3.save();
});

describe('Retrieving projects', () => {
  it('GET /api/projects 200 success user-authenticated', async () => {
    expect.assertions(4);
    const requestHandler = (req, res) => {
      req.session = { user };
      return apiResolver(req, res, undefined, ProjectsHandler);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect('length' in data).toBeTruthy();
    expect(data.length).toBeTruthy();
    return server.close();
  });
  it('GET /api/projects 200 success user-not-authenticated', async () => {
    expect.assertions(4);
    const requestHandler = (req, res) => apiResolver(req, res, undefined, ProjectsHandler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
    expect('length' in data).toBeTruthy();
    expect(data.length).toBeTruthy();
    return server.close();
  });
});
