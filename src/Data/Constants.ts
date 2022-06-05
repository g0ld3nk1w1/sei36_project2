export type TicketmasterEventType = {
  name: string;
  id: string;
  images: ImagesType[];
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
  };
  _embedded: {
    attractions: {
      url: string,
      id: string,
      name: string,
      images: ImagesType[],
      classifications: ClassificationType[]
    }[];
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
      images: ImagesType[];
      postalCode: string
    }[];
  };
  pleaseNote: string;
};

export type ImagesType = {
  ratio: string;
  url: string;
  width: number;
  height: number;
};


export type SearchObjectType = {
  country: string, dateTo: string, 
  dateFrom : string, keywords?: string,
  clickSearch: boolean
}

type ClassificationType = {
  segment: {id:string, name:string},
  genre: {id:string, name:string},
  subGenre: {id:string, name:string}
}