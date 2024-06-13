export type UsersData = Array<User>;
export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};
export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};
