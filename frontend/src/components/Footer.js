import { Container, Grid, Typography, Link, GlobalStyles } from "@mui/material";

const footers = [
	{
		title: "Company",
		description: [
			{ name: "Team", href: "/" },
			{ name: "Contact us", href: "/" },
			{ name: "Locations", href: "/" },
		],
	},
	{
		title: "Services",
		description: [
			{ name: "Overview", href: "/overview" },
			{ name: "Time Series", href: "/time-series" },
		],
	},
	{
		title: "Legal",
		description: [
			{ name: "Privacy policy", href: "/" },
			{ name: "Terms of use", href: "/" },
		],
	},
];

function Footer() {
	return (
		<>
			<GlobalStyles
				styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
			/>
			<Container
				maxWidth="md"
				component="footer"
			>
				<Grid container spacing={4} justifyContent="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="text.primary" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											variant="subtitle1"
											color="text.secondary"
											style={{ textDecoration: "none" }}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 5 }}
                >
                    {"V3ry S3cur3 © "}
                    <Link color="inherit" href="https://gitlab.rnl.tecnico.ulisboa.pt/agisit/agisit23-g15">
                        Gitlab @ Instituto Superior Técnico
                    </Link>{" "}
                    {new Date().getFullYear()}.
                </Typography>
			</Container>
		</>
	);
}

export default Footer;