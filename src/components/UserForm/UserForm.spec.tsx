import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import UserForm from './UserForm';

describe('UserForm', () => {
  test('renders form fields and submit button', () => {
    render(<UserForm handleSubmit={() => {}} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Website')).toBeInTheDocument();
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument();

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

    test('calls handleSubmit with user data on form submission', async () => {
      const handleSubmitMock = vi.fn();
      render(<UserForm handleSubmit={handleSubmitMock} />);

      for (const [key, value] of Object.entries(mockUserData)) {
        await user.type(screen.getByLabelText(key), value);
      }

      screen.getByText('Submit').click();

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

    test('does not call handleSubmit when required fields are missing', () => {
      const handleSubmitMock = vi.fn();
      render(<UserForm handleSubmit={handleSubmitMock} />);

      screen.getByText('Submit').click();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });

    test('clears form fields after submission', async () => {
      const handleSubmitMock = vi.fn();
      render(<UserForm handleSubmit={handleSubmitMock} />);

      for (const [key, value] of Object.entries(mockUserData)) {
        await user.type(screen.getByLabelText(key), value);
      }

      screen.getByText('Submit').click();

      for (const key of Object.keys(mockUserData)) {
        expect(screen.getByLabelText(key)).toHaveValue('');
      }
    });
  });
});
