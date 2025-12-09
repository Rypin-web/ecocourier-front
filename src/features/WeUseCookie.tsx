import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

function WeUseCookie() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasCookie = localStorage.getItem("use-cookie");
        if (!hasCookie) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("use-cookie", "1");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className='fixed bottom-4 translate-x-1/20 z-50'>
            <Card className='w-[90vw] shadow-xl p-4 rounded-2xl'>
                <CardContent className='flex flex-col gap-3 p-0'>
                    <h1 className='text-lg bold'>Мы используем cookies</h1>
                    <Button onClick={accept} className='rounded-xl w-3xs self-end'>Хорошо</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export {WeUseCookie}
