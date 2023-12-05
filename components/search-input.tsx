"use client"

import {Search} from "lucide-react";
import qs from "query-string";
import {Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter, useSearchParams} from "next/navigation";
import { ChangeEventHandler, useState } from "react";

import { useEffect } from "react";

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value,500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId || null || "" ,
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipEmptyString : true, skipNull: true });

        router.push(url);
    }, [debouncedValue, router, categoryId]);

    return (
        <div className="realtive">
            <Search className="absolute h-4 w-4 top-3 left-4 text-white"/>
            <Input onChange={onChange} value={value}  placeholder="Search..." className="pl-10 bg-primary/10"/>
        </div>
    )
}