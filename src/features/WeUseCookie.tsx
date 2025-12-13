import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {TypographyH2, TypographyLarge, TypographyP} from "@/components/ui/typography.tsx";

function WeUseCookie() {
    const [visible, setVisible] = useState(false);
    const accept = () => {
        localStorage.setItem("use-cookie", "1");
        setVisible(false);
    };

    useEffect(() => {
        const hasCookie = parseInt(localStorage.getItem("use-cookie") || '0');
        if (!hasCookie) setVisible(true);
    }, []);

    if (!visible) return null;

    return (
        <div className='fixed bottom-4 translate-x-1/20 z-50'>
            <Card className='w-[90vw] shadow-xl p-10 rounded-2xl'>
                <CardContent className='flex flex-col gap-3 p-0'>
                    <TypographyH2 className={'text-left'}>Мы используем куки</TypographyH2>
                    <TypographyP>С их помощью сайт запоминает информацию о ваших посещениях.</TypographyP>
                    <Button onClick={accept} className='rounded-xl w-3xs self-end'>
                        <TypographyLarge>Хорошо</TypographyLarge>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export {WeUseCookie}
