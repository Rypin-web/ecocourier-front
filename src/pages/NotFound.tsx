import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/utils/cn.ts";
import {TypographyH1, TypographyP} from "@/components/ui/typography.tsx";

function NotFound() {
    return (
        <section className={cn('min-h-[60vh] flex items-center justify-center bg-background')}>
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="text-8xl font-bold text-chart-5 mb-6 animate-bounce">
                        404
                    </div>
                    <TypographyH1>
                        Упс! Страница не найдена
                    </TypographyH1>
                    <TypographyP className="text-muted-foreground">
                        Похоже, что страница, которую вы ищете, не существует или была перемещена.
                    </TypographyP>
                    <div className="flex mt-8 flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="px-8 py-6 text-base">
                            <Link to="/">
                                На главную
                            </Link>
                        </Button>
                        <Button 
                            variant="outline" 
                            asChild 
                            size="lg" 
                            className="px-8 py-6 text-base border-chart-5/50 hover:bg-chart-5/10"
                        >
                            <Link to="/products">
                                В каталог
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { NotFound };