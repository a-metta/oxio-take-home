import { act, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import UserForm, { successMessage } from './UserForm';

describe('UserForm', () => {
  test('renders form fields and submit button', () => {
    const formElements = [
      'Name',
      'Username',
      'Email',
      'Phone',
      'Website',
      'Company',
      'City',
      'Street',
      'Latitude',
      'Longitude',
    ];
    render(<UserForm handleSubmit={() => {}} />);

    formElements.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  describe('user interactions', () => {
    let user: UserEvent;
    const mockUserData = {
      Name: 'John Doe',
      Username: 'johndoe',
      Email: 'john@example.com',
      Phone: '1234567890',
      Website: 'example.com',
      Company: 'ABC Company',
      City: 'New York',
      Street: '123 Main St',
      Latitude: '40.7128',
      Longitude: '-74.0060',
    };

    beforeAll(() => {
      user = userEvent.setup();
    });

    test('does not call handleSubmit when required fields are missing', () => {
      const handleSubmitMock = vi.fn();
      render(<UserForm handleSubmit={handleSubmitMock} />);

      screen.getByText('Submit').click();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });

    describe('submits and clears form', () => {
      const handleSubmitMock = vi.fn();
      beforeEach(async () => {
        render(<UserForm handleSubmit={handleSubmitMock} />);

        await act(async () => {
          for (const [key, value] of Object.entries(mockUserData)) {
            await user.type(screen.getByLabelText(key), value);
          }
        });
      });

      test('calls handleSubmit with user data on form submission', () => {
        act(() => {
          screen.getByText('Submit').click();
        });

        expect(handleSubmitMock).toHaveBeenCalledWith({
          name: mockUserData.Name,
          username: mockUserData.Username,
          email: mockUserData.Email,
          phone: mockUserData.Phone,
          website: mockUserData.Website,
          company: {
            name: mockUserData.Company,
            catchPhrase: 'someCatchPhrase',
            bs: 'some',
          },
          address: {
            street: mockUserData.Street,
            suite: 'someSuite',
            city: mockUserData.City,
            zipcode: 'someZipcode',
            geo: {
              lat: mockUserData.Latitude,
              lng: mockUserData.Longitude,
            },
          },
        });
      });

      test('shows a success message after submission', () => {
        act(() => {
          screen.getByText('Submit').click();
        });

        expect(screen.getByText(successMessage)).toBeInTheDocument();
      });

      test('clears form fields after submission', () => {
        act(() => {
          screen.getByText('Submit').click();
        });

        for (const key of Object.keys(mockUserData)) {
          expect(screen.getByLabelText(key)).toHaveValue('');
        }
      });
    });
  });
});
