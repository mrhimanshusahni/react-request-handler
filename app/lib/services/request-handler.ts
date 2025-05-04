// External Dependencies
import axios, { AxiosError, type GenericAbortSignal } from "axios";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type BasePayloadType =
  | Record<string, unknown>
  | FormData
  | Array<Record<string, unknown>>;

interface SuccessResponse<SuccessData = unknown> {
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

interface RequestHandler<BodyType = BasePayloadType> {
  contentType?: string;
  isFormData?: boolean;
  method: HttpMethod;
  params?: Record<string, unknown>;
  requestData?: BodyType;
  signal?: GenericAbortSignal | undefined;
  url: string;
}

const axiosInstance = axios.create({});

const requestHandler = async <
  V = unknown,
  BodyType = BasePayloadType,
  E = AxiosError,
>({
  contentType,
  isFormData,
  method,
  params,
  requestData,
  signal,
  url,
}: RequestHandler<BodyType>): BaseResponse<V, E> => {
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
