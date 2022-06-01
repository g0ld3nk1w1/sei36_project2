export type TicketmasterEventType = {
  name: string;
  id: string;
  images: ImagesType[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
  };
  _embedded: {
    venues: {
      name: string;
      url: string;
      city: {
        name: string;
      };
      state: {
        name: string;
      };
      country: {
        name: string;
      };
    }[];
  };
};

export type ImagesType = {
  ratio: string;
  url: string;
  width: number;
  height: number;
};
