import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>Susangee Fees</title>
			</Head>
			{children}
		</main>
	);
}
