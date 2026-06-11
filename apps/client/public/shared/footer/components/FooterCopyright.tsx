export function FooterCopyright() {
    const year = new Date().getFullYear();

    return (
        <section className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
                © {year} LMS platform. All rights reserved.
            </p>
        </section>
    );
}
