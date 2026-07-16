import { createContext, useContext, useState } from "react";
import { Button } from "../../button/components/Button";
import { cn } from "#/utils/cn";

interface AccordionItem
{
    id: number;
    title: string;
    content: string;
}

interface AccordionContextValue 
{
    openedId: null | number;
    toggle: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextValue  | null>(null);

function useAccordionContext()
{
    const  accordionContext = useContext(AccordionContext);
    
    if (!accordionContext) {
        throw new Error("Accordion component must be used within an Accordion element");
    }
    return accordionContext;
}


export function AccordionProvider({ children }: { children: React.ReactNode }) 
{

    const [openedId, setOpenedId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setOpenedId(prev => prev === id ? null : id);
    };

    return <AccordionContext.Provider value={{ openedId, toggle }}>
        {children}
    </AccordionContext.Provider>;
}

export function Accordion({ children }: { children: React.ReactNode })
{
    return ( 
        <AccordionProvider>
            <section className="flex flex-col ">
                {children}
            </section>
        </AccordionProvider>
    )
}

export function AccordionItem({  children }: { children: React.ReactNode}) {
    return (
        <span className="flex flex-col ">
            {children}
        </span>
    )
}


export function AccordionHeader({ index, children }: {index: number, children: React.ReactNode})
{
    const { openedId, toggle } = useAccordionContext();
    const isOpend = openedId === index;
    return (
        <Button variant="primary" onClick={() => toggle(index)} className="w-full ">
            <span className="flex justify-between items-center bg-card! border border-foreground px-4 text-xl">
                <span className="text-lg font-bold">{children}</span>
                <span className="text-2xl">
                    {isOpend ? "-" : "+"}
                </span>
            </span>
        </Button>
    )
}

export function AccordionContent({ index, children }: {index: number, children: React.ReactNode})
{
    const { openedId } = useAccordionContext();
    return (
        <span className={cn("flex justify-between items-center bg-card border border-foreground  text-xl  text-foreground px-4 py-2", openedId === index ? "block" : "hidden")}>
            {children}
        </span>
    )
}