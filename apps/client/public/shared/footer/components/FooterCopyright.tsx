export function FooterCopyright() {
    const year = new Date().getFullYear();

    return (
        <section className="border-t border-border p-4">
            <p className="text-sm text-muted-foreground">
                © {year} LMS platform. All rights reserved.
            </p>
        </section>
    );
}
