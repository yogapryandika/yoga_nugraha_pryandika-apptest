import React from 'react';
import { renderSync, screen, fireEvent, render, cleanup, waitFor } from '../test-utils';
import ContactForm from '../components/ContactForm';

import '@testing-library/jest-dom/extend-expect'

const mockFunction = jest.fn((firstName, lastName, age, photo) => {
  return Promise.resolve({ firstName, lastName, age, photo })
})

afterEach(cleanup)

describe('Testing Form Validation', () => {
  beforeEach(() => {
    render(<ContactForm onSubmit={mockFunction} />)
  })

  it("should display required value", async () => {
    fireEvent.submit(screen.getByTestId("submit"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3)
    expect(mockFunction).not.toBeCalled()
  })

  it("form submitted", async () => {
    fireEvent.input(screen.getByTestId("firstName"), {
      target: {
        value: "yoyog"
      }
    });

    fireEvent.input(screen.getByTestId("lastName"), {
      target: {
        value: "nug"
      }
    });

    fireEvent.input(screen.getByTestId("age"), {
      target: {
        value: "24"
      }
    });

    fireEvent.input(screen.getByTestId("photo"), {
      target: {
        value: "N/A"
      }
    });

    fireEvent.submit(screen.getByTestId("submit"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
  })
})
