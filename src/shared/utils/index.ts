// 공용 유틸 예시
export class ResponseHandler {
  static handleSuccess(data: any) {
    return {
      status: 'success',
      data,
    };
  }

  static handleError(error: any) {
    return {
      status: 'error',
      message: error.message || 'An error occurred',
    };
  }
}