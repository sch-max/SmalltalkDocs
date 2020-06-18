import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MethodSidebar from './MethodSidebar';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('MethodSidebar', () => {
  it('should display fetched class and its methods', async () => {
    const sampleClassAndMethodsOfClassResponse = {
      isHelpBook: true,
      classMethods: ['newStarted', 'newStartedOn:'],
      count: { classMethods: 2, total: 12, instanceMethods: 10 },
      instanceMethods: [
        'getHelpPagesFrom:',
        'getClassMethodTextFrom:named:',
        'getInstanceMethodFrom:named:',
        'getMethods:',
        'getClasses',
        'getHelpPageFrom:at:',
        'helloWorld:',
        'getClassMethodFrom:named:',
        'getHelpBookFrom:',
        'getInstanceMethodTextFrom:named:'
      ]
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => sampleClassAndMethodsOfClassResponse
      })
    );

    await act(async () => {
      render(
        <Router>
          <MethodSidebar currentClass="test" />
        </Router>,
        container
      );
    });

    expect(container).toHaveTextContent('All classes...');

    global.fetch.mockRestore();
  });
});
