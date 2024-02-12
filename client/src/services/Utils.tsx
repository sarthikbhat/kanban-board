import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export const extractProjectNameFromURI = (pathName: string)=>{
  var path = decodeURI(pathName).split("_");
  path.pop();
  return path.join("_");
}
