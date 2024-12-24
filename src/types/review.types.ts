export interface ReviewsType {
  nextPage: 0;
  totalCount: 0;
  reviews: ReviewType[];
}

export interface ReviewType {
  user: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  concert: {
    concertId: number;
    location: string;
    title: string;
    artist: string;
    posterImageUrl: string;
  };
  reservationId: number;
  rating: number;
  content: string;
  images: {
    imageUrl: string;
    altText: string;
    status: 'ACTIVE';
    createdAt: string;
    updatedAt: string;
  }[];
  status: 'ACTIVE';
  createdAt: string;
  updatedAt: string;
}
