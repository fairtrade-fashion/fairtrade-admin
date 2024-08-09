import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const instance = axios.create({
  withCredentials: false,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
});

export const axiosBaseQuery =
  (
    {
      baseUrl,
      customHeaders,
    }: { baseUrl: string; customHeaders?: Record<string, string> } = {
      baseUrl: "",
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const headers = {
        ...instance.defaults.headers,
        ...customHeaders,
      };

      const modifiedInstance = axios.create({
        ...instance.defaults,
        headers,
      });

      const result = await modifiedInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
