export const metadata = {
    tittle: 'Frontend',
    description: 'Web frontend',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}