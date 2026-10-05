import { createContext, useContext, useState } from "react";
import { Button } from "../../button/components/Button";
import { cn } from "#/utils/cn";

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


export function AccordionProvider({ children, defaultOpenId = null }: { children: React.ReactNode; defaultOpenId?: number | null }) 
{

    const [openedId, setOpenedId] = useState<number | null>(defaultOpenId);

    const toggle = (id: number) => {
        setOpenedId(prev => prev === id ? null : id);
    };

    return <AccordionContext.Provider value={{ openedId, toggle }}>
        {children}
    </AccordionContext.Provider>;
}

export function Accordion({ children, defaultOpenId }: { children: React.ReactNode; defaultOpenId?: number | null })
{
    return ( 
        <AccordionProvider defaultOpenId={defaultOpenId}>
            <div className="flex flex-col">
                {children}
            </div>
        </AccordionProvider>
    )
}

export function AccordionItem({  children }: { children: React.ReactNode}) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}


export function AccordionHeader({ index, children }: {index: number, children: React.ReactNode})
{
    const { openedId, toggle } = useAccordionContext();
    const isOpen = openedId === index;
    return (
        <Button
            variant="outline"
            onClick={() => toggle(index)}
            aria-expanded={isOpen}
            className="w-full justify-between rounded-none border-x-0 border-b-0 px-4 py-4 text-left last:border-b"
        >
            <span className="min-w-0 font-semibold text-base">{children}</span>
            <span aria-hidden="true" className="text-primary text-xl leading-none">
                {isOpen ? "-" : "+"}
            </span>
        </Button>
    )
}

export function AccordionContent({ index, children }: {index: number, children: React.ReactNode})
{
    const { openedId } = useAccordionContext();
    return (
        <div className={cn("border-border border-x-0 border-b bg-muted/40 px-3 py-2", openedId === index ? "block" : "hidden")}>
            {children}
        </div>
    )
}