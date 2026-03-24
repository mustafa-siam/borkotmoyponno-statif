export interface IReviewRequest {
  name: string;
  rating: number;
  designation: string;
  content: string;
}

export interface IReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: {
    name: string;
    designation: string;
    content: string;
    rating: number;
    _id: string;
  };
}

export interface IReviewGetRequest {
  search: string;
}
export interface IReview {
  name: string;
  designation: string;
  content: string;
  rating: number;
  _id: string;
}
export interface IReviewGetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: IReview[];
}
