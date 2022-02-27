import { render } from '../test-utils';
import App from '../App';

import '@testing-library/jest-dom/extend-expect'

test('Should render app without crashing', () => {
  const { getByText } = render(<App />)
  const titleText = getByText(/Contacts/i)
  expect(titleText).toBeInTheDocument()
})
