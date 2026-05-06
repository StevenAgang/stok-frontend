export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  content?: T;
}
