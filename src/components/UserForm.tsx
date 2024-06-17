import { User } from '@customTypes/users';
import './UserForm.css';

type UserForm = {
  name: { value: string };
  username: { value: string };
  email: { value: string };
  phone: { value: string };
  website: { value: string };
  company: { value: string };
  city: { value: string };
  street: { value: string };
};

function UserForm({
  handleSubmit,
}: {
  handleSubmit: (user: Omit<User, 'id'>) => void;
}) {
  return (
    <form
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & UserForm;
        handleSubmit({
          name: target.name.value,
          username: target.username.value,
          email: target.email.value,
          phone: target.phone.value,
          website: target.website.value,
          company: {
            name: target.company.value,
            catchPhrase: 'someCatchPhrase',
            bs: 'some',
          },
          address: {
            street: target.street.value,
            suite: 'someSuite',
            city: target.city.value,
            zipcode: 'someZipcode',
            geo: {
              lat: 'someLat',
              lng: 'someLng',
            },
          },
        });
      }}
    >
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' placeholder='Name' required />
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' placeholder='Username' required />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' placeholder='Email' required />
      </div>
      <div>
        <label htmlFor='phone'>Phone</label>
        <input id='phone' type='tel' placeholder='Phone' required />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input id='website' type='text' placeholder='Website' required />
      </div>
      <div>
        <label htmlFor='company'>Company</label>
        <input id='company' type='text' placeholder='Company' required />
      </div>
      <div>
        <label htmlFor='city'>City</label>
        <input id='city' type='text' placeholder='City' required />
      </div>
      <div>
        <label htmlFor='street'>Street</label>
        <input id='street' type='text' placeholder='Street' required />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default UserForm;
