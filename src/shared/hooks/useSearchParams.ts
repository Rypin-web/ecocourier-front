import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";

export function useSearchParams<T extends object> (args:TSearchParams<T>): [T, Dispatch<SetStateAction<T>>]  {
  const [searchParams, setSearchParams] = useState(args)

  useEffect(() => {
    setSearchParams(args)
  }, [args])

  return [searchParams, setSearchParams] as unknown as [T, Dispatch<SetStateAction<T>>]
}