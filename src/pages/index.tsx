import type { NextPage } from "next";

import Head from "next/head";

import { BasicLayout } from "../components/BasicLayout";
import { ChooseGenerateMode } from "../components/ChooseGenerateMode";
import { LogoTitle } from "../components/LogoTitle";

const Home: NextPage = () => {
	return (
		<BasicLayout>
			<Head>
				<title>Mockup Generator</title>
			</Head>

			<LogoTitle />

			<ChooseGenerateMode />
		</BasicLayout>
	);
};

export default Home;
