export type UserProfile = {
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
      number: number;
    };
    phone: string;
    avatar: string;
    bio: string;
    website: string;
    social: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
    settings: {
      address_book: boolean;
      manage_account: boolean;
      location: boolean;
      currency: boolean;
    };
  };
  