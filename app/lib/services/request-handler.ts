// External Dependencies
import axios, { AxiosError, type GenericAbortSignal } from "axios";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type PayloadType = string | Record<string, unknown> | FormData;

interface SuccessResponse<SuccessData> {
  code: "success";
  data: SuccessData;
  headers: unknown;
}

interface ErrorResponse<Error = AxiosError> {
  code: "error";
  error: Error;
}

type BaseResponse<V, E = AxiosError> = Promise<
  SuccessResponse<V> | ErrorResponse<E>
>;

interface RequestHandler {
  contentType?: string;
  isFormData?: boolean;
  method: HttpMethod;
  params?: Record<string, unknown>;
  requestData?: PayloadType;
  signal?: GenericAbortSignal | undefined;
  url: string;
}

const axiosInstance = axios.create({});

const requestHandler = async <V, E = AxiosError>({
  contentType,
  isFormData,
  method,
  params,
  requestData,
  signal,
  url,
}: RequestHandler): BaseResponse<V, E> => {
  try {
    const axiosOptions = {
      url,
      method,
      ...(method !== "get" && { data: requestData }),
      headers: {
        "Content-Type": contentType
          ? contentType
          : isFormData
            ? "multipart/form-data"
            : "application/json",
      },
      isFormData,
      params,
      signal,
    };
    const { data, headers } = await axiosInstance(axiosOptions);
    return {
      code: "success",
      data,
      headers,
    };
  } catch (error) {
    return {
      code: "error",
      error: error as E,
    };
  }
};

export { requestHandler };
