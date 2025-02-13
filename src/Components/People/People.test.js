import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

// import { setupServer } from 'msw/node';

import People from './People';

// const TEST_NAME = 'John Doe';
// const TEST_EMAIL = 'test@test.com';
// const TEST_RESPONSE = {
//   TEST_EMAIL : {
//     'name': TEST_NAME,
//     'affiliation': '',
//     'email': TEST_EMAIL,
//     'roles': [
//       'ED'
//     ]
//   }
// };

// // declare which API requests to mock
// const server = setupServer(
//   // capture "GET /people" requests
//   http.get('/people', (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return HttpResponse.json(TEST_RESPONSE);
//   }),
// );

// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

describe('People component', () => {
  it('shows form when add person button is clicked', async () => {
    render(<People />);

    await userEvent.click(screen.getByText('Add a Person'));
    await screen.findAllByRole('textbox');

    expect(screen.getAllByRole('textbox')).toHaveLength(2);

  });

  // it('adds a new person', () => {
  //   render(<People />);
  // })
});
